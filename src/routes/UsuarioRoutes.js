const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);

module.exports = router;
