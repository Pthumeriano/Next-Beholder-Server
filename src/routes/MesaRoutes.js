const express = require('express');
const router = express.Router();

const MesaController = require('../controllers/MesaController')

router.get('/mesas', MesaController.listarMesas);
router.post('/mesas', MesaController.criarMesa);
router.get('/mesa', MesaController.buscarMesa);
router.delete('/mesa', MesaController.excluirMesa)

module.exports = router;
