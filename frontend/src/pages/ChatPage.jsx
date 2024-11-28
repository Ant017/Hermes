import { useEffect, useState } from "react";
import { GetAllChatsApi } from "../apiEndpoints/chat";
import ChatList from "../components/molecules/chatList";
import Header from "../components/molecules/header";
import Popup from "../components/atoms/popup";
import ProfilePopup from "../components/molecules/profilePopup";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await GetAllChatsApi();
      setChats(response);
    };

    fetchChats();
  }, []);

  return (
    <div className="p-chat">
      <Header setShowPopup={setShowPopup} showPopup={showPopup} />
      <Popup show={showPopup}>
        <ProfilePopup />
      </Popup>
      <div className="p-chat__container">
        <ChatList chats={chats} />
        <div className="p-chat__right"></div>
      </div>
    </div>
  );
};

export default ChatPage;
