const supabase = require('../config/supabase');

class UsuarioModel {
  static async listarUsuarios() {
    try {
      const { data, error } = await supabase.from('usuario').select('*');
      return { data, error };
    } catch (error) {
      return { error };
    }
  }

  static async buscarUsuarioPorId(id) {
    try {
      const { data, error } = await supabase.from('usuario').select('*').eq('id', id).single();
      return { data, error };
    } catch (error) {
      return { error };
    }
  }

  static async criarNovoUsuario(usuario) {
    try {
      const { data, error } = await supabase.from('usuario').upsert([usuario]);
      return { data, error };
    } catch (error) {
      return { error };
    }
  }
}

module.exports = UsuarioModel;
