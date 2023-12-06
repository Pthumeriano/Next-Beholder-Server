const UsuarioChatService = require("../services/UsuarioChatService");

const adicionarUsuarioNoChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.usuarioAutenticado.userId;

    const result = await UsuarioChatService.adicionarUsuarioNoChat(
      userId,
      chatId
    );

    if (result.error) {
      throw new Error(`Erro ao adicionar usuário no chat: ${result.error}`);
    }

    res.json({
      mensagem: "Usuário adicionado ao chat com sucesso!",
      chat: result.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removerUsuarioDoChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.usuarioAutenticado.userId;

    const result = await UsuarioChatService.removerUsuarioDoChat(
      userId,
      chatId
    );

    if (result.error) {
      throw new Error(`Erro ao remover usuário do chat: ${result.error}`);
    }

    res.json({
      mensagem: "Usuário removido do chat com sucesso!",
      chat: result.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarUsuarioChat = async (req, res) => {
  const result = await UsuarioChatService.listarUsuarioChat();
  res.json(result);
};

module.exports = {
  adicionarUsuarioNoChat,
  removerUsuarioDoChat,
  listarUsuarioChat,
};
