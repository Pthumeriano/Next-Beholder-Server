const supabase = require('../config/supabase');

class UsuarioChatModel {
    
  static async adicionarUsuarioNoChat(idusuario, idchat) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .upsert([{ idusuario: idusuario, idchat: idchat }]);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async removerUsuarioDoChat(idusuario, idchat) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .delete()
        .eq('idusuario', idusuario)
        .eq('idchat', idchat);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarChatsDoUsuario(idusuario) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .select('idchat')
        .eq('idusuario', idusuario);

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
  

  static async verficarUsuarioChat(idusuario, idchat) {
    try {
      const { data, error } = await supabase
        .from('usuariochat')
        .select('*')
        .eq('idusuario', idusuario)
        .eq('idchat', idchat);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

}

module.exports = UsuarioChatModel;
