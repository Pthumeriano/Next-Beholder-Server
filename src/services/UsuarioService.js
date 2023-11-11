const UsuarioModel = require('../models/UsuarioModel');

class UsuarioService {
  static async listarUsuarios() {
    return await UsuarioModel.listarUsuarios();
  }

  static async buscarUsuarioPorId(id) {
    return await UsuarioModel.buscarUsuarioPorId(id);
  }

  static async criarNovoUsuario(usuario) {
    return await UsuarioModel.criarNovoUsuario(usuario);
  }

  static async atualizarSenha(id, senhaAntiga, novaSenha) {
    try {
      // Chama o método do modelo para verificar o usuário e a senha antiga
      
      const usuarioValido = await UsuarioModel.buscarUsuarioPoridSenha(id, senhaAntiga);

      // Verifica se o usuário é válido
      if (!usuarioValido.data || usuarioValido.data.length === 0) {
        return { error: 'Usuário ou senha antiga inválidos' };
      }
  
      // Agora que sabemos que o usuário é válido, chama o método do modelo para atualizar a senha
      const result = await UsuarioModel.atualizarSenha(id, novaSenha);
  
      return result;
    } catch (error) {
      return { error: error.message };
    }
  } 

  static async excluirUsuarioPorId(id) {
    try {
      // Verifica se o usuário com o ID fornecido existe
      const usuarioExistente = await UsuarioModel.buscarUsuarioPorId(id);
      if (!usuarioExistente.data) {
        return { error: 'Usuário não encontrado' };
      }

      // Chama o método do modelo para excluir o usuário por ID
      const result = await UsuarioModel.excluirUsuarioPorId(id);

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

}

module.exports = UsuarioService;