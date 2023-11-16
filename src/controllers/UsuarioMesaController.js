const UsuarioMesaService = require('../services/UsuarioMesaService');

const adicionarUsuarioNaMesa = async (req, res) => {
  try {
    const { mesaId } = req.params;
    const  userId  = req.usuarioAutenticado.userId;

    const result = await UsuarioMesaService.adicionarUsuarioNaMesa(userId, mesaId);

    if (result.error) {
      throw new Error(`Erro ao adicionar usuário na mesa: ${result.error}`);
    }

    res.json({ mensagem: 'Usuário adicionado à mesa com sucesso!', mesa: result.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removerUsuarioDaMesa = async (req, res) => {
  try {
    const { mesaId } = req.params;
    const  userId  = req.usuarioAutenticado.userId;

    const result = await UsuarioMesaService.removerUsuarioDaMesa(userId, mesaId);

    if (result.error) {
      throw new Error(`Erro ao remover usuário da mesa: ${result.error}`);
    }

    res.json({ mensagem: 'Usuário removido da mesa com sucesso!', mesa: result.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarUsuarioMesa = async (req, res) => {
  const result = await UsuarioMesaService.listarUsuarioMesa();
  res.json(result)
}

module.exports = {
  adicionarUsuarioNaMesa,
  removerUsuarioDaMesa,
  listarUsuarioMesa
};
