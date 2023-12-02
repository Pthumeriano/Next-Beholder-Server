const express = require("express");
const router = express.Router();

const TemaController = require("../controllers/TemaController");

router.get("/", TemaController.listarTemas);
router.get("/id/:id", TemaController.buscarTema);
router.get("/nome/:nome", TemaController.buscarTemaNome);

module.exports = router;
