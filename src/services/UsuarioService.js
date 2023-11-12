const jwt = require('jsonwebtoken');
const cookie = require('cookie');

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

  static async login(email, senha, res) {
    try {
      // Chama o método do modelo para buscar o usuário por email e senha
      const usuario = await UsuarioModel.buscarUsuarioPorEmailSenha(email, senha);

      // Verifica se o usuário foi encontrado
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Credenciais inválidas' };
      }

      // Gera um token JWT usando a variável de ambiente
      const token = jwt.sign({ userId: usuario.data[0].id }, process.env.SECRET_KEY, {
        expiresIn: '30d', // Token válido por 30 dias
      });

      // Adiciona o token ao cookie
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Cookie válido por 30 dias
      };
      const cookieName = 'BeholderToken'; // Nome do cookie conforme padrões de nomeação

      // Adiciona o cookie à resposta
      res.cookie(cookieName, token, cookieOptions);
      console.log("Cookie: " + cookieName);
      console.log("Token: " + token);
      console.log("Options: " + cookieOptions.expires);

      return { mensagem: 'Login bem-sucedido', usuario: usuario.data[0] };
    } catch (error) {
      return { error: `Erro ao fazer login: ${error.message}` };
    }
  }

}

module.exports = UsuarioService;