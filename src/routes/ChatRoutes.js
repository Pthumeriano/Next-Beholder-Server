/*
  todo chat tem um mestre associado, se o usuario apagar a conta, o banco apaga todos os chats associados
*/


const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController')
const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware')

router.get('/chats', ChatController.listarChats);
router.get('/chat', ChatController.buscarChat);
router.delete('/excluir-chat', AuthMiddleware, ChatController.excluirChat);
router.post('/chat', AuthMiddleware, ChatController.criarChat);


module.exports = router;
