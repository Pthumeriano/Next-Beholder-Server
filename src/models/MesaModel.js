/*
  A mesa tem um chat, precisa chamar a criação do chat na hora de criar a mesa e passar o id pro serviço da Mesa
*/

const supabase = require('../config/supabase');
const ChatModel = require('../models/ChatModel')

class MesaModel {


    static async listarMesas() {
        try {
          const { data, error } = await supabase.from('mesa').select('*');
          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

      static async buscarMesa(id) {
        try {
          const { data, error } = await supabase.from('mesa').select('*').eq('id',id);
          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

      static async criarMesa(mestre, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas, chat) {
        try {
          const { result, error } = await supabase
            .from('mesa')
            .insert([
              {
                mestre,
                titulo,
                subtitulo,
                sistema,
                descricao,
                data,
                horario,
                periodo,
                preco,
                vagas,
                chat
              }
            ])
            .select();
      
          return { result, error };
        } catch (error) {
          return { error: error.message };
        }
      }
      
      //basta excluri o chat associado
      static async excluirMesa(id) {
        try {
          // Buscar informações da mesa para obter o ID do chat associado
          const { data: mesaInfo, error: mesaError } = await supabase
            .from('mesa')
            .select('id, chat')
            .eq('id', id)
            .single();
    
          if (mesaError) {
            return { error: mesaError.message };
          }
          
          const chatId = mesaInfo.chat;

          // Excluir o chat associado à mesa usando o modelo do Chat
          const { error: chatError } = await ChatModel.excluirChat(chatId);
    
          if (chatError) {
            return { error: `Erro ao excluir chat: ${chatError.message}` };
          }

          return { mensagem: 'Mesa excluída com sucesso' };
        } catch (error) {
          return { error: error.message };
        }
      }

}

module.exports = MesaModel;