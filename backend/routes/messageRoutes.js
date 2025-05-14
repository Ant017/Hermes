const express = require('express');
const routes = express.Router();
const { isUserLoggedIn } = require('../middleware/authMiddleware');
const MessageController = require('../controllers/messageController');

routes.post('/send', isUserLoggedIn, MessageController.sendMessage);
routes.get("/fetch-messages/:chatId", isUserLoggedIn, MessageController.fetchMessages);

module.exports = routes;