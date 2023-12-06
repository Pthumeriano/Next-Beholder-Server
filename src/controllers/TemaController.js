const TemaService = require("../services/TemaService");

const listarTemas = async (req, res) => {
  try {
    const { data, error } = await TemaService.listarTemas();
    if (error) {
      throw new Error(`Erro ao listar temas: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarTemaNome = async (req, res) => {
  try {
    const { data, error } = await TemaService.buscarTemaNome(req.params.nome);
    if (error) {
      throw new Error(`Erro ao buscar tema por nome: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarTema = async (req, res) => {
  try {
    const { data, error } = await TemaService.buscarTema(req.params.id);
    if (error) {
      throw new Error(`Erro ao buscar tema por id: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarTemas,
  buscarTema,
  buscarTemaNome,
};
