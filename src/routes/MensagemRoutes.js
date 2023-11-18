const express = require('express');
const router = express.Router();

const MensagemController = require('../controllers/MensagemController');

const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware')
const Validacao = require('../middlewares/ValidacaoMiddleware')

router.get('/', AuthMiddleware, MensagemController.listarMensagens);
router.get('/:id', AuthMiddleware, MensagemController.listarMensagensChat);
router.post('/:id', AuthMiddleware, MensagemController.enviarMensagemChat);
router.delete('/excluir/:id', AuthMiddleware, MensagemController.excluirMensagemChat);
router.patch('/editar/:id', AuthMiddleware, MensagemController.editarMensagemChat);

module.exports = router;
