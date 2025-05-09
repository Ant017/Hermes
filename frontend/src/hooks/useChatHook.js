import { useEffect, useState } from "react";
import { GetAllChatsApi } from "../apiEndpoints/chat";

const useChatHook = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await GetAllChatsApi();
      setChats(response);
    };

    fetchChats();
  }, []);

  return { chats };
};

export default useChatHook;
