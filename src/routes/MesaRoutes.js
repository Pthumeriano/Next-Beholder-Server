const express = require('express');
const router = express.Router();

const MesaController = require('../controllers/MesaController')

router.get('/mesas', MesaController.listarMesas)

module.exports = router;
