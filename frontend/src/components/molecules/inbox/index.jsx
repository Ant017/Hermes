import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { getMessageApi, sendMessageApi } from "../../../apiEndpoints/message";
import { useSelector } from "react-redux";
import Form from "../form";
import { useForm } from "react-hook-form";
import sendIcon from "/icons/send.png";
import Button from "../../atoms/button";
import Divider from "../../atoms/divider";

const Inbox = ({ chats }) => {
  const { chatId } = useSelector((state) => state.chat);
  const { userID } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const inboxRef = useRef(null);
  const formRef = useRef(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data) => {
    const messageData = {
      chatId: chatId,
      content: data.content,
    };
    const response = await sendMessageApi(messageData);
    if (response) {
      setMessages((prevMessages) => [...prevMessages, response]);
      reset({ content: "" });
    }
  };

  const scrollToBottom = () => {
    if (inboxRef.current) {
      inboxRef.current.scrollTop = inboxRef.current.scrollHeight;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessageApi(chatId);
      if (response) {
        setMessages(response);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="m-inbox">
      <div className="m-inbox__header">
        <p className="m-inbox__title">{messages[0]?.chat.chatName}</p>
        <div className="m-inbox__profilePicContainer">

        </div>
      </div>
      <Divider horizontal={true} color="grey-light" />
      <div className="m-inbox__container" ref={inboxRef}>
        {messages.map((message) => {
          if (!message.isChat) {
            return (
              <div
                key={message._id}
                className="m-inbox__message m-inbox__message--system"
              >
                <p className="m-inbox__content m-inbox__content--system">
                  {message.content}
                </p>
              </div>
            );
          }
          if (message.sender._id === userID) {
            return (
              <div
                key={message._id}
                className="m-inbox__message m-inbox__message--self"
              >
                <div className="m-inbox__messageContent m-inbox__messageContent--self">
                  <p className="m-inbox__sender">{message.sender.username}</p>
                  <p className="m-inbox__content m-inbox__content--self">
                    {message.content}
                  </p>
                </div>
                <img
                  src={message.sender.imageUrl}
                  alt="profile pic"
                  className="m-inbox__profilePic"
                />
              </div>
            );
          } else {
            return (
              <div
                key={message._id}
                className="m-inbox__message m-inbox__message--other"
              >
                <img
                  src={message.sender.imageUrl}
                  alt="profile pic"
                  className="m-inbox__profilePic"
                />
                <div className="m-inbox__messageContent m-inbox__messageContent--other">
                  <p className="m-inbox__sender">{message.sender.username}</p>
                  <p className="m-inbox__content m-inbox__content--other">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
      {chats && chats.length > 0 && (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="m-inbox__sendMessage"
        >
          <Form
            type={"text"}
            inputType="textarea"
            name={"content"}
            placeholder={"Type a message..."}
            control={control}
            errors={errors}
            padding="medium"
            keyDown={onKeyDown}
          />
          <Button
            type="submit"
            className="m-inbox__sendButton"
            icon={sendIcon}
            iconAlt="send icon"
            size="small"
            backgroundColor="transparent"
          />
        </form>
      )}
    </div>
  );
};

export default Inbox;
