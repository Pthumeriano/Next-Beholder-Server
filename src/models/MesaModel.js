/*
  A mesa tem um chat, precisa chamar a criação do chat na hora de criar a mesa e passar o id pro serviço da Mesa
*/

const supabase = require('../config/supabase');

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
      


}

module.exports = MesaModel;