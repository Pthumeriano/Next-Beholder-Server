const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { validarNovoUsuario } = require('../middlewares/valiadacaoUsuarioMiddleware');
const { validarAtualizacaoSenha } = require('../middlewares/valiadacaoUsuarioMiddleware')
const { validarLogin } = require('../middlewares/valiadacaoUsuarioMiddleware');


const router = express.Router();

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.post('/usuarios', validarNovoUsuario, UsuarioController.criarNovoUsuario);
router.post('/usuarios/atualizar-senha', validarAtualizacaoSenha, UsuarioController.atualizarSenha);
router.delete('/usuarios/deletar/:id', UsuarioController.excluirUsuarioPorId);
router.post('/usuarios/login', validarLogin, UsuarioController.login); 


module.exports = router;
