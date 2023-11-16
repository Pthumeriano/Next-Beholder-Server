const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

  static async atualizarSenha(senhaAntiga, novaSenha, usuarioAutenticado) {
    try {

      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(usuarioAutenticado, senhaAntiga);
  
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado ou senha incorreta' };
      }

      const result = await UsuarioModel.atualizarSenha(usuarioAutenticado, novaSenha);

      return result;
    } catch (error) {

      return { error: error.message };
    }
  }

  static async atualizarEmail(id, email, senha, novoEmail){
    try {

      const usuario = await UsuarioModel.buscarUsuarioEmailSenha(email, senha);
      
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado ou senha incorreta' };
      }
      
      // Atualiza o email
      const result = await UsuarioModel.atualizarEmail(id, novoEmail);
  
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async atualizarUsuario(usuarioAutenticado, novosDados){
    try {
      
      const usuario = await UsuarioModel.buscarUsuario(usuarioAutenticado);
  
      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado' };
      }

      const result = await UsuarioModel.atualizarUsuario(usuarioAutenticado, novosDados);

      return result;

    } catch (error) {

      return { error: error.message };
    }
  }

  static async excluirUsuario(usuarioAutenticado, senha) {
    try {
      const userId = usuarioAutenticado;
  
      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(userId, senha);

      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Usuário não encontrado ou senha incorreta' };
      }
  
      const result = await UsuarioModel.excluirUsuarioPorId(userId);
  
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
  

  static async login(email, senha, res) {
    try {

      const usuario = await UsuarioModel.buscarUsuarioEmail(email);


      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Credenciais inválidas' };
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.data[0].senha);

      if (!senhaCorreta) {
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

      return { mensagem: 'Login bem-sucedido', usuario: usuario.data[0] };
    } catch (error) {
      return { error: `Erro ao fazer login: ${error.message}` };
    }
  }

}

module.exports = UsuarioService;