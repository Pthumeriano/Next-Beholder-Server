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

      static async buscarMesaTitulo(titulo) {
        try {
          const { data, error } = await supabase.from('mesa').select('*').eq('titulo',titulo);
          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

      static async buscarMesaMestre(mestreId, mesaId) {
        try {
          return await supabase
            .from('mesa')
            .select('*')
            .eq('mestre', mestreId)
            .eq('id', mesaId);
    
        } catch (error) {
          return { error: error.message };
        }
      }

      static async buscarChatMesa(mesaId) {
        try {
          const { data, error } = await supabase
            .from('mesa')
            .select('chat')
            .eq('id', mesaId);
      
          if (error) {
            return { error: error.message };
          }
      
          if (data && data.length > 0) {
            return { chatId: data[0].chat, error: null };
          }
      
          return { error: 'Mesa não encontrada' };
        } catch (error) {
          return { error: error.message };
        }
      }
      
      

      static async criarMesa(mestre, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas, chat) {
        try {
          return await supabase
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

      static async alterarMesa(id, novosDados) {
        try {

          const { data, error } = await supabase
            .from('mesa')
            .update(novosDados)
            .eq('id', id);
    
          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

      static async verificarVagasDisponiveis(mesaId) {
        try {
          const { data, error } = await supabase
            .from('mesa')
            .select('vagas')
            .eq('id', mesaId);
    
          if (error) {
            throw new Error(error.message);
          }
    
          if (data && data.length > 0) {
            const vagas = data[0].vagas;
            return vagas;
          }
    
          throw new Error('Mesa não encontrada');
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      static async atualizarVagasDisponiveis(mesa_id) {
        try {
          //chamada da função do banco
          let { data, error } = await supabase
            .rpc('atualizarvagas', {
            mesa_id
          });

          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

      static async adicionarVaga(mesa_id) {
        try {
          //chamada da função do banco
          let { data, error } = await supabase
            .rpc('adicionarvaga', {
            mesa_id
          });

          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

}

module.exports = MesaModel;