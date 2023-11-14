const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController')

router.get('/chats', ChatController.listarChats);
router.get('/chat', ChatController.buscarChat);
router.delete('/excluir-chat', ChatController.excluirChat);


module.exports = router;
