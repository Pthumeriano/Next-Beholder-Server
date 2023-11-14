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
}

module.exports = MesaModel;