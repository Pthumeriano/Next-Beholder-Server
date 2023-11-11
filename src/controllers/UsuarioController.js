const UsuarioService = require('../services/UsuarioService');

const listarUsuarios = async (req, res) => {
  try {
    const { data, error } = await UsuarioService.listarUsuarios();
    if (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await UsuarioService.buscarUsuarioPorId(id);
    if (error) {
      throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
    }

    if (!data) {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
};
