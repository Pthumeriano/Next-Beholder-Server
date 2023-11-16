const supabase = require('../config/supabase');

class MensagemModel {

    static async criarMensagem(){
        try {
            return await supabase
            .from('mensagem')
            .select('*');

        } catch (error) {
            return { error: error.message };
        }
    }

    static async lerMensagem(id){
        try {
            return await supabase
            .from('mensagem')
            .select('*')
            .eq('id', id);

        } catch (error) {
            return { error: error.message };
        }
    }

    static async listarMensagens(){
        try {
            return await supabase
            .from('mensagem')
            .select('*');

        } catch (error) {
            return { error: error.message };
        }
    }

    static async listarMensagensChat(chat){
        try {
            return await supabase
            .from('mensagem')
            .select('*')
            .eq('chat', chat);

        } catch (error) {
            return { error: error.message };
        }
    }

    static async listarMensagensAutor(autor){
        try {
            return await supabase
            .from('mensagem')
            .select('*')
            .eq('autor', autor);

        } catch (error) {
            return { error: error.message };
        }
    }

    static async editarMensagem(id, novaMensagem) {
        try {
            return await supabase
                .from('mensagem')
                .update(novaMensagem)
                .eq('id', id);
        } catch (error) {
            return { error: error.message };
        }
    }

    static async deletarMensagem(id) {
        try {
            return await supabase
                .from('mensagem')
                .delete()
                .eq('id', id);
        } catch (error) {
            return { error: error.message };
        }
    }



}

module.exports = MensagemModel;