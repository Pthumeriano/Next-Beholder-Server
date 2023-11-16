const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

const AuthMiddleware = require('../middlewares/autenticacaoMiddleware');
const Validacao = require('../middlewares/ValidacaoMiddleware')



router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuario', UsuarioController.buscarUsuario);
router.post('/usuarios', Validacao.validarNovoUsuario, UsuarioController.criarNovoUsuario);
router.post('/usuarios/atualizar-senha', AuthMiddleware, Validacao.validarAtualizacaoSenha, UsuarioController.atualizarSenha);
router.delete('/usuarios/excluir', AuthMiddleware, UsuarioController.excluirUsuario);
router.post('/usuarios/login', UsuarioController.login);

module.exports = router;
