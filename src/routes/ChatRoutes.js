const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController')

router.get('/chats', ChatController.listarChats)


module.exports = router;
