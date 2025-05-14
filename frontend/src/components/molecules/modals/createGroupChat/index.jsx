import { useEffect, useState } from "react";
import {
  createGroupChatApi,
  GetAllChatsApi,
} from "../../../../apiEndpoints/chat";
import { useForm } from "react-hook-form";
import Form from "../../form";
import Button from "../../../atoms/button";
import { useDispatch, useSelector } from "react-redux";
import { saveChatListState } from "../../../../redux/slices/chatSlice";
import SearchBar from "../../../atoms/searchBar";
import useCommonHook from "../../../../hooks/useCommonHook";
import "./index.scss";
import Loader from "../../../atoms/loader";
import penIcon from "/icons/write.png";
import warningIcon from "/icons/danger.png";
import CustomCheckBox from "../../../atoms/checkbox";

const CreateGroupChat = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.user);
  const { users, isLoading } = useCommonHook();
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
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
        placeholder="Group Name"
        rules={{
          required: "Group Name is required",
        }}
        errors={errors}
        icon={penIcon}
        border="underlined"
        padding="small"
      />
      <br />
      <SearchBar
        onChange={onSearchValueChange}
        value={searchValue}
        size="large"
      />
      {isLoading ? (
        <div className="m-createGroupChat__loader">
          <Loader size="header" />
        </div>
      ) : filteredUsers && filteredUsers.length > 0 ? (
        <div className="m-createGroupChat__userList">
          {filteredUsers
            .filter((user) => user._id !== userID)
            .map((user) => {
              return (
                <div key={user._id} className="m-createGroupChat__user">
                  <div className="m-createGroupChat__userDetails">
                    <img
                      className="m-createGroupChat__userImage"
                      src={user.imageUrl}
                      alt="user icon"
                    />
                    <p className="m-createGroupChat__userName">
                      {user.username}
                    </p>
                  </div>
                  <CustomCheckBox
                    value={user._id}
                    id={user._id}
                    name="users"
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      if (checked) {
                        setValue("users", [...getValues("users"), value]);
                      } else {
                        setValue(
                          "users",
                          getValues("users").filter((id) => id !== value)
                        );
                      }
                    }}
                  />
                </div>
              );
            })}
        </div>
      ) : (
        <div className="m-createGroupChat__noResults">
          <img
            className="m-header__noUserIcon"
            src={warningIcon}
            alt="warning icon"
          />
          <p>No users found</p>
        </div>
      )}

      <Button
        type="submit"
        padding="10"
        backgroundColor="white"
        borderRadius="6"
        width="100"
        value={"Create"}
      />
    </form>
  );
};

export default CreateGroupChat;
