import { useEffect, useRef, useState } from "react";
import { GetAllChatsApi } from "../apiEndpoints/chat";
import ChatList from "../components/molecules/chatList";
import Header from "../components/molecules/header";
import Popup from "../components/atoms/popup";
import ProfilePopup from "../components/molecules/profilePopup";
import useCommonHook from "../hooks/useCommonHook";
import UserSearchPopup from "../components/atoms/userSearchPopup";

const ChatPage = () => {
  const { users } = useCommonHook();
  const [chats, setChats] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const profilePopupRef = useRef(null);
  const searchPopupRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await GetAllChatsApi();
      setChats(response);
    };

    fetchChats();
  }, []);

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
      />
      <Popup
        show={showProfilePopup}
        forwardedRef={profilePopupRef}
      >
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
        />
      </Popup>
      <div className="p-chat__container">
        <ChatList chats={chats} />
        <div key={chats.length} className="p-chat__right"></div>
      </div>
    </div>
  );
};

export default ChatPage;
