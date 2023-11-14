const supabase = require('../config/supabase');

class ChatModel {

    static async listarChats() {
        try {
          const { data, error } = await supabase.from('chat').select('*');
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

      static async buscarChat(id) {
        try {
          const { data, error } = await supabase.from('chat').select('*').eq('id', id);
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

      static async excluirChat(id){
        try {
            const { data } = await supabase.from('chat').delete().eq('id',id);
            return {data}
        } catch (error) {
            return { error: error.message };
        }
      }
      
}

module.exports = ChatModel;