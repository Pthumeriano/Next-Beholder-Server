const express = require('express');
const router = express.Router();

const AvaliacaoController = require('../controllers/AvaliacaoController')
const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware')

router.get('/',AuthMiddleware,  AvaliacaoController.listarAvaliacoesUsuario);
router.post('/avaliar', AuthMiddleware, AvaliacaoController.avaliar);



module.exports = router;
