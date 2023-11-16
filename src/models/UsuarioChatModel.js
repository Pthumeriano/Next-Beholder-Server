const supabase = require('../config/supabase');

class UsuarioChatModel {
    
  static async adicionarUsuarioNoChat(usuarioId, chatId) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .upsert([{ idusuario: usuarioId, idchat: chatId }]);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async removerUsuarioDoChat(usuarioId, chatId) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .delete()
        .eq('idusuario', usuarioId)
        .eq('idchat', chatId);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarChatsDoUsuario(usuarioId) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .select('idchat')
        .eq('idusuario', usuarioId);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarUsuarioChat() {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .select('*')

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

}

module.exports = UsuarioChatModel;
