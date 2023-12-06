const express = require('express');
const router = express.Router();

const MesaTemaController = require('../controllers/MesaTemaController')
const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware');

router.get('/:id', MesaTemaController.listarTemasMesa);
router.post('/adicionar/:id', AuthMiddleware, MesaTemaController.adicionarTema);
router.delete('/remover/:id', AuthMiddleware, MesaTemaController.removerTema);

module.exports = router;
