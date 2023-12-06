const MensagemModel = require("../models/MensagemModel");
const UsuarioChatModel = require("../models/UsuarioChatModel");

class MensagemService {
  static async listarMensagens() {
    return await MensagemModel.listarMensagens();
  }

  static async listarMensagensChat(usuarioAutenticado, idchat) {
    //se o usuário está na mesa
    const chat = await UsuarioChatModel.verficarUsuarioChat(
      usuarioAutenticado,
      idchat
    );

    if (!chat.data || chat.data.length === 0) {
      return { error: "Você não tem permissão para ler esta mensagem" };
    }

    return await MensagemModel.listarMensagensChat(idchat);
  }

  static async editarMensagem(usuarioAutenticado, id, texto) {
    try {
      const mensagem = await MensagemModel.verificarAutor(
        usuarioAutenticado,
        id
      );

      if (!mensagem.data || mensagem.data.length === 0) {
        return { error: "Você não tem permissão para editar esta mensagem" };
      }

      const result = await MensagemModel.editarMensagem(id, texto);

      return result;
    } catch (error) {
      console.error("Erro ao editar mensagem:", error.message);
      return { error: error.message };
    }
  }

  static async excluirMensagem(usuarioAutenticado, id) {
    const mensagem = await MensagemModel.verificarAutor(usuarioAutenticado, id);

    if (!mensagem.data || mensagem.data.length === 0) {
      return { error: "Você não tem permissão para editar esta mensagem" };
    }

    return await MensagemModel.excluirMensagem(id);
  }

  static async enviarMensagem(usuarioAutenticado, chatId, mensagem) {
    //se o usuário está na mesa
    const chat = await UsuarioChatModel.verficarUsuarioChat(
      usuarioAutenticado,
      chatId
    );

    if (!chat.data || chat.data.length === 0) {
      return { error: "Você não tem permissão para enviar esta mensagem" };
    }

    return await MensagemModel.criarMensagem(
      usuarioAutenticado,
      chatId,
      mensagem
    );
  }
}

module.exports = MensagemService;
