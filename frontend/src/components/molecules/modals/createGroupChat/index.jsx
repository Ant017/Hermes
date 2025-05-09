import React from "react";
import { createGroupChatApi } from "../../../../apiEndpoints/chat";
import { useForm } from "react-hook-form";
import Form from "../../form";
import Button from "../../../atoms/button";

const CreateGroupChat = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      chatName: "",
      users: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createGroupChatApi(data);
      if (response) {
        // Handle success
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <form
      className="m-createGroupChat"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Form
        type="text"
        name="chatName"
        control={control}
        placeholder="Chat Name"
        rules={{
          required: "Chat Name is required",
        }}
        errors={errors}
      />
      <Button
        type="submit"
        padding="10"
        backgroundColor="white"
        borderRadius="2"
        width="100"
        value={"Create"}
      />
    </form>
  );
};

export default CreateGroupChat;
