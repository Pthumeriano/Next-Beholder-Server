const supabase = require('../config/supabase');
  const bcrypt = require('bcrypt');

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

  static async buscarUsuarioEmail(email) {
    try {
      const {data, error} = await supabase.from('usuario').select('*').eq('email', email);
      return {data, error}
    } catch (error) {
      return { error: error.message };
    }
  }

  static async buscarUsuarioEmailSenha(email, senha) {
    try {
      // Obter usuário pelo e-mail
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('email', email);
  
      if (data && data.length > 0) {
        const usuario = data[0];
        
        // Comparar a senha descriptografada com a senha armazenada
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  
        if (senhaCorreta) {
          // Se a senha estiver correta, remover a senha antes de retornar os dados
          delete usuario.senha;
          return { data: [usuario], error };
        }
      }
  
      return { data: null, error: 'Email ou senha incorretos' };
    } catch (error) {
      return { error: error.message };
    }
  }
  

  static async buscarUsuarioPoridSenha(id, senha) {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', id);
  
      if (data && data.length > 0) {
        const usuario = data[0];
        
        // Comparar a senha fornecida com a senha armazenada no banco de dados
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorreta) {
          // Se a senha estiver correta, remova a senha antes de retornar os dados do usuário
          const { senha, ...usuarioSemSenha } = usuario;
          return { data: [usuarioSemSenha], error };
        }
      }
  
      return { data: null, error: 'Email ou senha incorretos' };
    } catch (error) {
      return { error: error.message };
    }
  }
  

  static async criarNovoUsuario(usuario) {
    try {
      // Extrair a senha do usuário
      const { senha, ...outrosCampos } = usuario;

      // Criptografar a senha
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Adicionar a senha criptografada aos outros campos
      const usuarioComSenhaCriptografada = { senha: senhaCriptografada, ...outrosCampos };

      // Inserir o usuário no banco de dados
      const { data, error } = await supabase.from('usuario').upsert([usuarioComSenhaCriptografada]);
      
      return { data, error };
    } catch (error) {
      return { error };
    }
  }

  static async atualizarSenha(id, novaSenha) {
    try {
      const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
      const { data, error } = await supabase
        .from('usuario')
        .update({ senha: senhaCriptografada })
        .eq('id', id);
  
      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async atualizarEmail(id, novoEmail) {
    try {

      const { data, error } = await supabase
      .from('usuario')
      .update({ email: novoEmail })
      .eq('id', id);
  
      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async atualizarUsuario(id, novosDados) {
    try {

      const { data, error } = await supabase
        .from('usuario')
        .update(novosDados)
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
