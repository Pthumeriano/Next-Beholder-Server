const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const AuthMiddleware = require('../middlewares/AutenticacaoMiddleware');

router.get('/', AuthMiddleware, PostController.listarPosts);
router.get('/:id',AuthMiddleware, PostController.buscarPost);
router.post('/postar', AuthMiddleware, PostController.criarPost);
router.delete('/apagar/:id', AuthMiddleware, PostController.excluirPost);
router.patch('/editar/:id', AuthMiddleware, PostController.editarPost);


module.exports = router;