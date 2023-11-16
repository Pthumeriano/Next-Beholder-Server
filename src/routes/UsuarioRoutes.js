const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

const AuthMiddleware = require('../middlewares/autenticacaoMiddleware');



router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuario', UsuarioController.buscarUsuario);
router.post('/usuarios',  UsuarioController.criarNovoUsuario);
router.post('/usuarios/atualizar-senha', AuthMiddleware, UsuarioController.atualizarSenha);
router.delete('/usuarios/excluir', AuthMiddleware, UsuarioController.excluirUsuario);
router.post('/usuarios/login', UsuarioController.login);

module.exports = router;
