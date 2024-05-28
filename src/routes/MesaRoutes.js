const express = require("express");
const router = express.Router();

const MesaController = require("../controllers/MesaController");

const AuthMiddleware = require("../middlewares/AutenticacaoMiddleware");
const Validacao = require("../middlewares/ValidacaoMiddleware");

router.get("/mesas", MesaController.listarMesas);
router.get("/minhasmesas", AuthMiddleware, MesaController.listarMesasDoMestre);
router.post(
  "/mesas",
  AuthMiddleware,
  Validacao.validarCriacaoMesa,
  MesaController.criarMesa
);
router.get("/mesa/:id", MesaController.buscarMesa);
router.get("/buscar-mesa/:titulo", MesaController.buscarMesaTitulo);
router.delete("/mesa", AuthMiddleware, MesaController.excluirMesa);
router.patch("/mesa/:id", AuthMiddleware, Validacao.validarAlteracaoMesa, MesaController.alterarMesa);

module.exports = router;
