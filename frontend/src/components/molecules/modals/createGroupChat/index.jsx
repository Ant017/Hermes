import { useEffect, useState } from "react";
import {
  createGroupChatApi,
  GetAllChatsApi,
} from "../../../../apiEndpoints/chat";
import { useForm } from "react-hook-form";
import Form from "../../form";
import Button from "../../../atoms/button";
import { useDispatch } from "react-redux";
import { saveChatListState } from "../../../../redux/slices/chatSlice";
import SearchBar from "../../../atoms/searchBar";
import useCommonHook from "../../../../hooks/useCommonHook";
import "./index.scss";

const CreateGroupChat = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { users } = useCommonHook();
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      chatName: "",
      users: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createGroupChatApi(data);
      if (response) {
        const chats = await GetAllChatsApi();
        if (chats) {
          closeModal();
          dispatch(saveChatListState({ chatListLength: chats.length }));
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onSearchValueChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);

    const trimmedQuery = query.trim().toLowerCase();
    const filtered = users?.filter((user) =>
      user.username.toLowerCase().includes(trimmedQuery)
    );

    if (trimmedQuery) {
      setFilteredUsers(filtered || []);
    } else {
      setFilteredUsers(users || []);
    }
  };

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users]);

  return (
    <form
      className="m-createGroupChat"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Form
        type="text"
        name="chatName"
        control={control}
        placeholder="Chat Name"
        rules={{
          required: "Chat Name is required",
        }}
        errors={errors}
        border="underlined"
        padding="small"
      />
      <br />
      <SearchBar onChange={onSearchValueChange} value={searchValue} size="large" />
      {filteredUsers && filteredUsers.length > 0 ? (
        <div key={filteredUsers._id} className="m-createGroupChat__userList">
          {filteredUsers
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map((user) => {
              return (
                <div key={user._id} className="m-createGroupChat__user">
                  <img
                    className="m-createGroupChat__userImage"
                    src={user.imageUrl}
                    alt="user icon"
                  />
                  <p className="m-createGroupChat__userName">{user.username}</p>
                </div>
              );
            })}
        </div>
      ) : null}
      <Button
        type="submit"
        padding="10"
        backgroundColor="white"
        borderRadius="2"
        width="100"
        value={"Create"}
      />
    </form>
  );
};

export default CreateGroupChat;
