const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AutenticacaoMiddleware");
const UsuarioMesaController = require("../controllers/UsuarioMesaController");

// Adicionar usuário à mesa
router.post(
  "/:mesaId/adicionar",
  AuthMiddleware,
  UsuarioMesaController.adicionarUsuarioNaMesa
);
router.get("/", UsuarioMesaController.listarUsuarioMesa);
router.get("/:id", UsuarioMesaController.listarUsuariosDaMesa);
router.get("/mesas-do-usuario/:id", UsuarioMesaController.listarMesasDoUsuario);

// Remover usuário da mesa
router.post(
  "/:mesaId/remover",
  AuthMiddleware,
  UsuarioMesaController.removerUsuarioDaMesa
);

module.exports = router;
