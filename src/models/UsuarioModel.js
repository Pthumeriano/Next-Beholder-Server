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

  static async buscarUsuarioPorEmailSenha(email, senha) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('email', email)
        .eq('senha', senha);

      return { data, error };
    } catch (error) {
      return { error };
    }
  }

  static async buscarUsuarioPoridSenha(id, senha) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', id)
        .eq('senha', senha);

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

  static async atualizarSenha(id, novaSenha) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .update({ senha: novaSenha })
        .eq('id', id);
  
      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }
  
  static async excluirUsuarioPorIdSenha(id, senha) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .delete()
        .eq('id', id)
        .eq('senha', senha);

      return { data, error };
    } catch (error) {
      return { error };
    }
  }

}

module.exports = UsuarioModel;
