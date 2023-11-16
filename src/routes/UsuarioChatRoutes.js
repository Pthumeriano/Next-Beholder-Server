const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware');
const UsuarioChatController = require('../controllers/UsuarioChatController');

// Adicionar usuário ao chat
router.post('/:chatId/adicionar', AuthMiddleware, UsuarioChatController.adicionarUsuarioNoChat);

// Remover usuário do chat
router.post('/:chatId/remover', AuthMiddleware, UsuarioChatController.removerUsuarioDoChat);

module.exports = router;
