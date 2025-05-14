import { useEffect, useState } from "react";
import "./index.scss";
import { getMessageApi, sendMessageApi } from "../../../apiEndpoints/message";
import { useSelector } from "react-redux";
import Form from "../form";
import { useForm } from "react-hook-form";
import sendIcon from "/icons/send.png";
import Button from "../../atoms/button";

const Inbox = () => {
  const { chatId } = useSelector((state) => state.chat);
  const [messages, setMessages] = useState([]);

  const {
    handleSubmit,
    control,
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
    console.log("Message sent:", response);
    if (response) {
      setMessages((prevMessages) => [...prevMessages, response]);
    }
  };

  const clearMessage = (e) => {
    e.target.value = "";
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
  return (
    <div className="m-inbox">
      <div className="m-inbox__container">
        {messages.map((message) => (
          <div key={message._id} className="m-inbox__message">
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-inbox__sendMessage">
        <Form
          type={"text"}
          inputType="textarea"
          name={"content"}
          placeholder={"Type a message..."}
          // rules={{ required: "Cannot send empty message" }}
          control={control}
          errors={errors}
          padding="medium"
        />
        <Button
          type="submit"
          className="m-inbox__sendButton"
          icon={sendIcon}
          iconAlt="send icon"
          size="small"
          backgroundColor="transparent"
          onClick={(e) => clearMessage(e)}
        />
      </form>
    </div>
  );
};

export default Inbox;
