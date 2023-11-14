const supabase = require('../config/supabase');

class ChatModel {

    static async listarChats() {
        try {
            console.log("Chegou no model")
          const { data, error } = await supabase.from('chat').select('*');
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

}

module.exports = ChatModel;