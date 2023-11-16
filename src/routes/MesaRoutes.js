const express = require('express');
const router = express.Router();

const MesaController = require('../controllers/MesaController')

const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware')
const Validacao = require('../middlewares/ValidacaoMiddleware')

router.get('/mesas', MesaController.listarMesas);
router.post('/mesas', AuthMiddleware, Validacao.validarCriacaoMesa, MesaController.criarMesa);
router.get('/mesa', MesaController.buscarMesa);
router.delete('/mesa', AuthMiddleware, MesaController.excluirMesa)
router.patch('/mesa/:id', AuthMiddleware, MesaController.alterarMesa);

module.exports = router;
