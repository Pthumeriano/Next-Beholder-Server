const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { validarNovoUsuario, validarAtualizacaoSenha, validarLogin } = require('../middlewares/valiadacaoUsuarioMiddleware');
const autenticarMiddleware = require('../middlewares/autenticacaoMiddleware');

const router = express.Router();

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuario', UsuarioController.buscarUsuario);
router.post('/usuarios', validarNovoUsuario, UsuarioController.criarNovoUsuario);
router.post('/usuarios/atualizar-senha', autenticarMiddleware, validarAtualizacaoSenha, UsuarioController.atualizarSenha);
router.delete('/usuarios/excluir', autenticarMiddleware, UsuarioController.excluirUsuario);
router.post('/usuarios/login', validarLogin, UsuarioController.login);

module.exports = router;
