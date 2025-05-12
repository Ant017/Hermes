import { useEffect } from "react";
import warningIcon from "/icons/danger.png";
import useCommonHook from "../../../hooks/useCommonHook";
import { accessChatApi, GetAllChatsApi } from "../../../apiEndpoints/chat";
import { saveChatListState } from "../../../redux/slices/chatSlice";
import { useDispatch } from "react-redux";

const UserSearchPopup = ({
  filteredUsers,
  setUserList,
  closeSearchPopup,
  setSelectedUser,
  onUserSelect,
}) => {
  const dispatch = useDispatch();
  const { users } = useCommonHook();

  useEffect(() => {
    if (users && users.length > 0) {
      setUserList(users);
    }
  }, [users, setUserList]);

  const handleUserClick = async (user) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
    setSelectedUser(user);
    const response = await accessChatApi(user._id);
    if (response) {
      const chats = await GetAllChatsApi();
      if (chats) {
        dispatch(saveChatListState({ chatListLength: chats.length }));
      }
    }
    closeSearchPopup();
  };

  return (
    <div className="m-header__searchPopup">
      {filteredUsers && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            className="m-header__searchResult"
            onClick={() => handleUserClick(user)}
          >
            {user.username}
          </div>
        ))
      ) : (
        <div className="m-header__noUser">
          <img
            className="m-header__noUserIcon"
            src={warningIcon}
            alt="warning icon"
          />
          <p>No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserSearchPopup;
