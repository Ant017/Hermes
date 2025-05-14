import { useEffect, useRef, useState } from "react";
import { GetAllChatsApi } from "../apiEndpoints/chat";
import ChatList from "../components/molecules/chatList";
import Header from "../components/molecules/header";
import Popup from "../components/atoms/popup";
import ProfilePopup from "../components/molecules/profilePopup";
import useCommonHook from "../hooks/useCommonHook";
import UserSearchPopup from "../components/atoms/userSearchPopup";
import { useDispatch, useSelector } from "react-redux";
import { saveChatListState } from "../redux/slices/chatSlice";
import Inbox from "../components/molecules/inbox";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { users } = useCommonHook();
  const { selectedOption } = useSelector((state) => state.chat);
  const [chats, setChats] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const chatState = useSelector((state) => state.chat);
  const chatListLength = chatState?.chatListLength || 0;

  const profilePopupRef = useRef(null);
  const searchPopupRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await GetAllChatsApi();
      if (response) {
        if (selectedOption === "All") {
          setChats(response);
        } else if (selectedOption === "Group") {
          const groupChats = response.filter((chat) => chat.isGroupChat);
          setChats(groupChats);
        } else if (selectedOption === "Single") {
          const personalChats = response.filter((chat) => !chat.isGroupChat);
          setChats(personalChats);
        }
        dispatch(saveChatListState({ chatListLength: response.length }));
      }
    };

    fetchChats();
  }, [chatListLength, selectedOption]);

  useEffect(() => {
    if (!users || users.length === 0 || showProfilePopup) {
      setShowSearchPopup(false);
    }
  }, [users, showProfilePopup]);

  const closeSearchPopup = () => {
    setShowSearchPopup(false);
  };

  return (
    <div className="p-chat">
      <Header
        setShowProfilePopup={setShowProfilePopup}
        showProfilePopup={showProfilePopup}
        setShowSearchPopup={setShowSearchPopup}
        showSearchPopup={showSearchPopup}
        setFilteredUsers={setFilteredUsers}
        selectedUser={selectedUser.username}
      />
      <Popup show={showProfilePopup} forwardedRef={profilePopupRef}>
        <ProfilePopup />
      </Popup>
      <Popup
        show={showSearchPopup}
        isLeft={true}
        forwardedRef={searchPopupRef}
        onClose={closeSearchPopup}
      >
        <UserSearchPopup
          filteredUsers={filteredUsers}
          setUserList={setFilteredUsers}
          closeSearchPopup={closeSearchPopup}
          setSelectedUser={setSelectedUser}
          onUserSelect={(user) => {
            setSelectedUser(user);
            // This will ensure the username is passed back to the Header component's searchValue
          }}
        />
      </Popup>
      <div className="p-chat__container">
        <ChatList chats={chats} />
        <div className="p-chat__right">
          <Inbox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
