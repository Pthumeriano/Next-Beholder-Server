const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { validarNovoUsuario } = require('../middlewares/valiadacaoUsuarioMiddleware');

const router = express.Router();

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.post('/usuarios', validarNovoUsuario, UsuarioController.criarNovoUsuario);

module.exports = router;
