const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UsuarioMesaModel = require('../models/UsuarioMesaModel');
const UsuarioChatModel = require('../models/UsuarioChatModel');
const MesaModel = require('../models/MesaModel');

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

  static async entrarNaMesa(usuarioId, mesaId) {
    try {
      // Verificar se o usuário já está na mesa
      const usuarioJaNaMesa = await UsuarioMesaModel.listarMesasDoUsuario(usuarioId);
      if (usuarioJaNaMesa.data && usuarioJaNaMesa.data.some(m => m.idmesa === mesaId)) {
        return { error: 'O usuário já está na mesa' };
      }
  
      // Verificar se há vagas disponíveis na mesa
      const vagasDisponiveis = await MesaModel.verificarVagasDisponiveis(mesaId);
      if (vagasDisponiveis <= 0) {
        return { error: 'Não há vagas disponíveis na mesa' };
      }
  
      // Buscar o chatId
      const resultadoBuscarChat = await MesaModel.buscarChatMesa(mesaId);
  
      if (resultadoBuscarChat.error) {
        console.error('Erro ao buscar chat da mesa:', resultadoBuscarChat.error);
        return { error: 'Erro ao buscar chat da mesa' };
      }
  
      const chatId = resultadoBuscarChat.chatId;
  
      // Adicionar usuário à mesa
      const resultadoEntradaMesa = await UsuarioMesaModel.adicionarUsuarioNaMesa(usuarioId, mesaId);
      if (resultadoEntradaMesa.error) {
        console.error('Erro ao adicionar usuário à mesa:', resultadoEntradaMesa.error);
        return { error: 'Erro ao adicionar usuário à mesa' };
      }
  
      // Atualizar a contagem de vagas na mesa
      const resultadoAtualizacaoVagas = await MesaModel.atualizarVagasDisponiveis(mesaId, -1);
      if (resultadoAtualizacaoVagas.error) {
        console.error('Erro ao atualizar a contagem de vagas na mesa:', resultadoAtualizacaoVagas.error);
        // Se ocorrer um erro na atualização, reverta a entrada do usuário.
        await UsuarioMesaModel.removerUsuarioDaMesa(usuarioId, mesaId);
        return { error: 'Erro ao atualizar a contagem de vagas na mesa' };
      }
  
      // Associar usuário ao chat da mesa
      const resultadoAssociacaoChat = await UsuarioChatModel.adicionarUsuarioNoChat(usuarioId, chatId);
      if (resultadoAssociacaoChat.error) {
        console.error('Erro ao associar usuário ao chat:', resultadoAssociacaoChat.error);
        // Se ocorrer um erro na associação, reverta a entrada do usuário e a atualização de vagas.
        await UsuarioMesaModel.removerUsuarioDaMesa(usuarioId, mesaId);
        await MesaModel.atualizarVagasDisponiveis(mesaId, 1);
        return { error: 'Erro ao associar usuário ao chat da mesa' };
      }
  
      console.log('Usuário entrou na mesa com sucesso');
  
      return { mensagem: 'Usuário entrou na mesa com sucesso' };
    } catch (error) {
      console.error('Erro ao entrar na mesa:', error.message);
      return { error: error.message };
    }
  }
  
  

}

module.exports = UsuarioService;