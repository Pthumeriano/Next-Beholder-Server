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

  static async buscarUsuario(id) {
    try {
      const {data, error} = await supabase.from('usuario').select('*').eq('id', id);
      return {data, error}
    } catch (error) {
      return { error: error.message };
    }
  }

  static async excluirUsuario(id, senha) {
    try {

      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(id, senha);

      // Verifica se o usuário com o ID e senha fornecidos existe
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado ou senha incorreta' };
      }

      // Agora que sabemos que o usuário é válido, chama o método do modelo para excluir o usuário por ID
      const result = await UsuarioModel.excluirUsuarioPorId(id);

      return result;
    } catch (error) {
      return { error: error.message };
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
  
  static async excluirUsuarioPorId(id) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .delete()
        .eq('id', id);

      return { data, error };
    } catch (error) {
      return { error };
    }
  }

}

module.exports = UsuarioModel;
