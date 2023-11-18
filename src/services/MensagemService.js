const MensagemModel = require('../models/MensagemModel');
const UsuarioModel = require('../models/UsuarioModel');
const UsuarioMesaModel = require('../models/UsuarioMesaModel');
const UsuarioChatModel = require('../models/UsuarioChatModel');
const MesaModel = require('../models/MesaModel');


class MensagemService {

    static async listarMensagens(){
        return await MensagemModel.listarMensagens();
    }

    static async listarMensagensChat(usuarioAutenticado, idchat){   

        //se o usuário está na mesa
        const chat = await UsuarioChatModel.verficarUsuarioChat(usuarioAutenticado, idchat);

        if (!chat.data || chat.data.length === 0) {
            return { error: 'Você não tem permissão para ler esta mensagem' };
        }

        return await MensagemModel.listarMensagensChat(idchat);
    }

    static async editarMensagem(usuarioAutenticado, id, texto) {
        try {
            const mensagem = await MensagemModel.verificarAutor(usuarioAutenticado, id);
    
            if (!mensagem.data || mensagem.data.length === 0) {
                console.log('Você não tem permissão para editar esta mensagem');
                return { error: 'Você não tem permissão para editar esta mensagem' };
            }
    
            console.log('Editando mensagem...');
            const result = await MensagemModel.editarMensagem(id, texto);
            console.log('Resultado da edição:', result);
    
            return result;
        } catch (error) {
            console.error('Erro ao editar mensagem:', error.message);
            return { error: error.message };
        }
    }
    

    static async excluirMensagem(usuarioAutenticado, id){

        const mensagem = await MensagemModel.verificarAutor(usuarioAutenticado, id);

        if (!mensagem.data || mensagem.data.length === 0) {
            return { error: 'Você não tem permissão para editar esta mensagem' };
        }


        return await MensagemModel.excluirMensagem(id);
    }

    static async enviarMensagem(usuarioAutenticado, chatId, mensagem){

        //se o usuário está na mesa
        const chat = await UsuarioChatModel.verficarUsuarioChat(usuarioAutenticado, chatId);

        if (!chat.data || chat.data.length === 0) {
            return { error: 'Você não tem permissão para enviar esta mensagem' };
        }

        return await MensagemModel.criarMensagem(usuarioAutenticado, chatId, mensagem)
    }

}

module.exports = MensagemService;