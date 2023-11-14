const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController')

router.get('/chats', ChatController.listarChats);
router.get('/chat', ChatController.buscarChat);


module.exports = router;
