import Divider from "../../atoms/divider";
import chatIcon from "/icons/chat.png";
import { chatOptions } from "../../../utils/constants";
import groupIcon from "/icons/team.png";
import Button from "../../atoms/button";
import Modal from "../../atoms/modal";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateGroupChat from "../modals/createGroupChat";
import "./index.scss";

const ChatList = ({ chats }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="m-chatList">
      <div className="m-chatList__header">
        <div className="m-chatList__title">
          <img className="m-chatList__icon" src={chatIcon} alt="chat icon" />
          <p className="m-chatList__titleText">All Chats</p>
        </div>
        <div className="m-chatList__addChat">
          <Button
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
            backgroundColor="transparent"
            width="100"
            color="white"
            borderRadius="20"
          >
            <span className="m-chatList__plus">+&nbsp;</span>
            <span>Create Group Chat</span>
          </Button>
        </div>
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
        {chats && chats.length > 0 ? (
          chats.slice(0, 10).map((chat) => {
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
          })
        ) : (
          <div className="m-chatList__noChat">No chats available</div>
        )}
      </div>
      {/* portal is for rendering the modal directly in the body, not as a child of the chatList component */}
      {/* only changes the physical location of the modal in the DOM, but it still acts as a children of the parent */}
      {showModal &&
        createPortal(
          <Modal handleClose={handleClose} title="Create A New Group Chat" size="small">
            <CreateGroupChat closeModal={handleClose} />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default ChatList;
