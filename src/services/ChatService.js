const ChatModel = require('../models/ChatModel')

class ChatService {

    static async listarChats() {
        console.log("Chegou no serviço")
        return await ChatModel.listarChats();
    }

}

module.exports = ChatService;