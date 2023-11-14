/*
  todo chat tem um mestre associado, se o usuario apagar a conta, o banco apaga todos os chats associados
*/


const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');
const ChatModel = require('../models/ChatModel')
const UsuarioService = require('../services/UsuarioService');

class ChatService {

    static async listarChats() {
        return await ChatModel.listarChats();
    }

    static async buscarChat(id){
        return await ChatModel.buscarChat(id);
    }

    static async excluirChat(id, token){

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;

        const chat = await ChatModel.buscarChatMestre(id, userId)

        console.log('Token: ' + token)
        console.log('ID: ' + userId)
        console.log('ID chat: ' + id)

        if (!chat.data || chat.data.length === 0) {
            return { error: 'Chat não encontrado' };
        }

        return await ChatModel.excluirChat(id, userId);
    }

    static async criarChat(token){

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;

        const usuario = await UsuarioService.buscarUsuario(userId)
        
        if (!usuario.data || usuario.data.length === 0) {
            return { error: 'Mestre da mesa inválido' };
        }

        return await ChatModel.criarChat(userId);
    }

}

module.exports = ChatService;