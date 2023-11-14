const supabase = require('../config/supabase');

class MesaModel {
    static async listarMesas() {
        try {
          const { data, error } = await supabase.from('mesa').select('*');
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

      static async criarMesa(mesa) {
        try {
          const { data, error } = await supabase.from('mesa').upsert([mesa])
          return { data, error };
        } catch (error) {
          return { error };
        }
      }


}

module.exports = MesaModel;