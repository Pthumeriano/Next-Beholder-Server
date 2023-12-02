const MesaModel = require('../models/MesaModel');
const ChatModel = require('../models/ChatModel');
const UsuarioService = require('../services/UsuarioService');

class MesaService {

  static async listarMesas() {
    return await MesaModel.listarMesas();
  }

  static async buscarMesa(id) {
    return await MesaModel.buscarMesa(id);
  }

  static async buscarMesaTtulo(titulo) {
    return await MesaModel.buscarMesaTtulo(titulo);
  }

  static async buscarMesaMestre(mestre, id){
    try {

      const usuarioValido = await MesaModel.buscarMesaMestre(mestre, id)

      if (!usuarioValido.data || usuarioValido.data.length === 0) {
        return;
      }

      return usuarioValido;

    } catch (error) {
      return { error: error.message };
    }
  }

  static async criarMesa(mestre, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas) {
    try {

      const chatResult = await ChatModel.criarChat(mestre);

      if (chatResult.error) {
        throw new Error(`Erro ao criar chat: ${chatResult.error}`);
      }

      const chatId = chatResult.data[0].id

      const result = await MesaModel.criarMesa(mestre, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas, chatId);

      await UsuarioService.entrarNaMesa(mestre, result.data[0].id);

      return {result} ;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async excluirMesa(mestre, id){
    try {


      const usuarioValido = await this.buscarMesaMestre(mestre, id);

      if (!usuarioValido.data || usuarioValido.data.length === 0) {
        return { error: 'Sessão inválida, efetue login novamente' };
    }

      const { result, error } = await MesaModel.excluirMesa(id);

      return { result, error };
    } catch (error) {
      return { error: error.message };
    }

  }

  static async alterarMesa(mestre, id, alteracoes) {
    try {

      const mesaExistente = await MesaModel.buscarMesaMestre(mestre, id);

      if (!mesaExistente.data || mesaExistente.data.length === 0) {
        return { error: 'Você não tem permissão para alterar esta mesa.' };
      }
  
      return await MesaModel.alterarMesa(id, alteracoes);

    } catch (error) {
      return { error: error.message };
    }
  }
  

}

module.exports = MesaService;
