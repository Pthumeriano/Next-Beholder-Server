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

    static async excluirChat(id, mestre){

        const chat = await ChatModel.buscarChatMestre(id, mestre)

        if (!chat.data || chat.data.length === 0) {
            return { error: 'Chat não encontrado' };
        }

        return await ChatModel.excluirChat(id, mestre);
    }

    static async criarChat(mestre){

        const usuario = await UsuarioService.buscarUsuario(mestre)
        
        if (!usuario.data || usuario.data.length === 0) {
            return { error: 'Mestre da mesa inválido' };
        }

        return await ChatModel.criarChat(mestre);
    }

}

module.exports = ChatService;