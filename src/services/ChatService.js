/*
  todo chat tem um mestre associado, se o usuario apagar a conta, o banco apaga todos os chats associados
*/


const supabase = require('../config/supabase');
const ChatModel = require('../models/ChatModel')
const UsuarioService = require('../services/UsuarioService');

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

    static async criarChat(id){
        //pegar id do cookie depois 

        const usuario = await UsuarioService.buscarUsuario(id)
        
        if (!usuario.data || usuario.data.length === 0) {
            return { error: 'Mestre da mesa inválido' };
          }

        return await ChatModel.criarChat(id);
    }

}

module.exports = ChatService;