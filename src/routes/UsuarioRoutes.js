const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware');
const Validacao = require('../middlewares/ValidacaoMiddleware')

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuario', UsuarioController.buscarUsuario);
router.post('/usuarios', Validacao.validarNovoUsuario, UsuarioController.criarNovoUsuario);
router.post('/usuarios/atualizar-senha', AuthMiddleware, Validacao.validarAtualizacaoSenha, UsuarioController.atualizarSenha);
router.post('/usuarios/atualizar-email', AuthMiddleware, Validacao.validarEmail, UsuarioController.atualizarEmail);
router.patch('/usuarios/atualizar', AuthMiddleware, Validacao.validarAlteracaoUsuario, UsuarioController.atualizarUsuario,);
router.delete('/usuarios/excluir', AuthMiddleware, UsuarioController.excluirUsuario);
router.post('/usuarios/login', UsuarioController.login);
router.post('/usuarios/entrar-na-mesa/:mesaId', AuthMiddleware, UsuarioController.entrarNaMesa);

module.exports = router;
