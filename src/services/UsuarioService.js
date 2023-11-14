const jwt = require('jsonwebtoken');

const UsuarioModel = require('../models/UsuarioModel');

class UsuarioService {
  static async listarUsuarios() {
    return await UsuarioModel.listarUsuarios();
  }

  static async buscarUsuario(id) {
    return await UsuarioModel.buscarUsuario(id);
  }

  static async criarNovoUsuario(usuario) {
    return await UsuarioModel.criarNovoUsuario(usuario);
  }

  static async atualizarSenha(senhaAntiga, novaSenha, token) {
    try {
      // Verifica se o usuário está autenticado
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.userId;

      // Chama o método do modelo para buscar o usuário por ID e senha
      console.log(decoded)
      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(userId, senhaAntiga);

      // Verifica se o usuário com o ID e senha fornecidos existe
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado ou senha incorreta' };
      }

      // Agora que sabemos que o usuário é válido, chama o método do modelo para atualizar a senha
      const result = await UsuarioModel.atualizarSenha(userId, novaSenha);

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async excluirUsuario(token, senha) {
    try {
      // Verifica se o usuário está autenticado
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.userId;

      // Chama o método do modelo para buscar o usuário por ID e senha
      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(userId, senha);

      // Verifica se o usuário com o ID e senha fornecidos existe
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado ou senha incorreta' };
      }

      // Agora que sabemos que o usuário é válido, chama o método do modelo para excluir o usuário por ID
      const result = await UsuarioModel.excluirUsuarioPorId(userId);

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