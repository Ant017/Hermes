const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const messageRoutes = require("./messageRoutes");

dotenv.config();

const app = express();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

module.exports = app;
