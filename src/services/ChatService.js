const ChatModel = require('../models/ChatModel')

class ChatService {

    static async listarChats() {
        return await ChatModel.listarChats();
    }

    static async buscarChat(id){
        return await ChatModel.buscarChat(id);
    }

}

module.exports = ChatService;