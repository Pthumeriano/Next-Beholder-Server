const ChatModel = require('../models/ChatModel')

class ChatService {

    static async listarChats() {
        return await ChatModel.listarChats();
    }

    static async buscarChat(id){
        return await ChatModel.buscarChat(id);
    }

    static async excluirChat(id){

        const chat = await ChatModel.buscarChat(id);

        if (!chat.data || chat.data.length === 0) {
            return { error: 'Chat não encontrado' };
        }

        return await ChatModel.excluirChat(id);
    }

}

module.exports = ChatService;