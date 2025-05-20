const messageModel = require("../models/messageModel");
const { success, failure } = require("../utils/successError");
const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

class MessageController {
  async sendMessage(req, res) {
    try {
      const { chatId, content } = req.body;

      if (!chatId || !content) {
        return res
          .status(400)
          .send(failure("Chat ID and content are required"));
      }

      const chat = await chatModel.findById(chatId);
      if (!chat) {
        return res.status(404).send(failure("Chat not found"));
      }

      const isUserInChat = chat.users.some((user) => {
        return user.toString() === req.user.userID.toString();
      });

      if (!isUserInChat) {
        return res.status(400).send(failure("User is not in the chat"));
      }

      const newMessage = {
        sender: req.user.userID,
        content: content,
        isChat: true,
        chat: chatId,
      };

      const message = await messageModel.create(newMessage);
      const fullMessage = await messageModel
        .findOne({ _id: message._id })
        .populate("sender", "username email imageUrl")
        .populate("chat");

      const updateLatestMessage = await chatModel.findByIdAndUpdate(
        chatId,
        {
          latestMessage: message._id,
        },
        { new: true }
      );

      if (!updateLatestMessage) {
        return res.status(404).send(failure("Chat not found"));
      }
      await updateLatestMessage.save();

      return res
        .status(200)
        .send(success("Message sent successfully", fullMessage));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async fetchMessages(req, res) {
    try {
      const { chatId } = req.params;

      if (!chatId) {
        return res.status(400).send(failure("Chat ID is required"));
      }

      const messages = await messageModel
        .find({ chat: chatId })
        .populate("sender", "username email imageUrl")
        .populate({
          path: "chat",
          populate: {
            path: "users",
            select: "username email imageUrl",
          },
        });

      console.log("messages", messages);

      return res
        .status(200)
        .send(success("Messages fetched successfully", messages));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }
}

module.exports = new MessageController();
