const UsuarioChatModel = require('../models/UsuarioChatModel');

class UsuarioChatService {
  static async adicionarUsuarioNoChat(usuarioId, chatId) {
    // Verifique se o usuário já está no chat
    const { data: chatsDoUsuario } = await UsuarioChatModel.listarChatsDoUsuario(usuarioId);
    if (chatsDoUsuario && chatsDoUsuario.some(chat => chat.idchat === chatId)) {
      return { error: 'Usuário já está no chat' };
    }

    const { data, error } = await UsuarioChatModel.adicionarUsuarioNoChat(usuarioId, chatId);
    return { data, error };
  }

  static async removerUsuarioDoChat(usuarioId, chatId) {
    // Verifique se o usuário está no chat
    const { data: chatsDoUsuario } = await UsuarioChatModel.listarChatsDoUsuario(usuarioId);
    if (!chatsDoUsuario || !chatsDoUsuario.some(chat => chat.idchat === chatId)) {
      return { error: 'Usuário não está no chat' };
    }

    const { data, error } = await UsuarioChatModel.removerUsuarioDoChat(usuarioId, chatId);
    return { data, error };
  }
}

module.exports = UsuarioChatService;
