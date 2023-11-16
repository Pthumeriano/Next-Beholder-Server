const ChatModel = require('../models/ChatModel');
const MensagemModel = require('../models/MensagemModel');

class MensagemService {

    static async listarMensagens(){
        return await MensagemModel.listarMensagens();
    }

    static async lerMensagem(id){
        return await MensagemModel.lerMensagem(id);
    }

}

module.exports = MensagemService;