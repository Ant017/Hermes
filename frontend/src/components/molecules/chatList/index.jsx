import Divider from "../../atoms/divider";
import chatIcon from "/icons/chat.png";
import { chatOptions } from "../../../utils/constants";
import groupIcon from "/icons/team.png";
import Button from "../../atoms/button";
import Modal from "../../atoms/modal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CreateGroupChat from "../modals/createGroupChat";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  saveChatId,
  saveSelectedOption,
} from "../../../redux/slices/chatSlice";

const ChatList = ({ chats }) => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(chatOptions[0]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    dispatch(saveSelectedOption({ selectedOption: option }));
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
            <div
              key={option}
              className={`${
                selectedOption === option ? "active" : ""
              } m-chatList__chatOptionText`}
              onClick={() => {
                handleOptionSelect(option);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
      <Divider horizontal={true} color="grey-light" />
      <div className="m-chatList__chats">
        {chats && chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <div
                className="m-chatList__chat"
                key={chat._id}
                onClick={() => {
                  dispatch(saveChatId({ chatId: chat._id }));
                }}
              >
                {chat.isGroupChat ? (
                  <img
                    className="m-chatList__group"
                    src={groupIcon}
                    alt="group icon"
                  />
                ) : (
                  <div>
                    {chat.users
                      .filter((user) => user._id !== userID)
                      .map((user) => (
                        <img
                          key={user._id}
                          className="m-chatList__group"
                          src={user.imageUrl}
                          alt="user icon"
                        />
                      ))}
                  </div>
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
          <Modal
            handleClose={handleClose}
            title="Create A New Group Chat"
            size="small"
          >
            <CreateGroupChat closeModal={handleClose} />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default ChatList;
