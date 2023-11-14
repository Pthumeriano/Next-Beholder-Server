const express = require('express');
const router = express.Router();

const MesaController = require('../controllers/MesaController')

router.get('/mesas', MesaController.listarMesas)
router.post('/mesas', MesaController.criarMesa)

module.exports = router;
