import Divider from "../../atoms/divider";
import chatIcon from "/icons/chat.png";
import { chatOptions } from "../../../utils/constants";
import groupIcon from "/icons/team.png";
import "./index.scss";

const ChatList = ({ chats }) => {
  return (
    <div className="m-chatList">
      <div className="m-chatList__title">
        <img className="m-chatList__icon" src={chatIcon} alt="chat icon" />
        <p className="m-chatList__titleText">All Chats</p>
      </div>
      <Divider horizontal={true} color="grey-light" />
      <div className="m-chatList__chatOption">
        {chatOptions.map((option) => {
          return (
            <div key={option} className="m-chatList__chatOptionText">
              {option}
            </div>
          );
        })}
      </div>
      <Divider horizontal={true} color="grey-light" />
      <div className="m-chatList__chats">
        {chats?.slice(0, 10).map((chat) => {
          return (
            <div className="m-chatList__chat" key={chat._id}>
              {chat.isGroupChat ? (
                <img
                  className="m-chatList__group"
                  src={groupIcon}
                  alt="group icon"
                />
              ) : (
                <img
                  className="m-chatList__group"
                  src={groupIcon}
                  alt="group icon"
                />
              )}
              <div>
                <p className="m-chatList__chatName">{chat.chatName}</p>
                <p className="m-chatList__lastMessage">
                  {chat.latestMessage?.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
