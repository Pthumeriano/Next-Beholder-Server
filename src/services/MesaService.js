const jwt = require('jsonwebtoken');
const MesaModel = require('../models/MesaModel');
const ChatModel = require('../models/ChatModel');

class MesaService {

  static async listarMesas() {
    return await MesaModel.listarMesas();
  }

  static async buscarMesa(id) {
    return await MesaModel.buscarMesa(id);
  }

  static async criarMesa(token, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const mestre = decoded.userId;

      // Chama o modelo do chat para criar um chat
      const chatResult = await ChatModel.criarChat(mestre);

      if (chatResult.error) {
        throw new Error(`Erro ao criar chat: ${chatResult.error}`);
      }

      const chatId = chatResult.data[0].id

      // Chama o modelo da mesa para criar uma mesa usando o ID do chat
      const { result, error } = await MesaModel.criarMesa(mestre, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas, chatId);

      return { result, error };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = MesaService;
