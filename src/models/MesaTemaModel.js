const supabase = require('../config/supabase')

class mesatemaModel{

  static async adicionarTema(mesaId, temaId) {
    try {
      const { data, error } = await supabase
        .from('mesatema')
        .upsert(
          [{ 'idmesa': mesaId, 'idtema': temaId }],
          { onConflict: ['idmesa', 'idtema'] }
        );
  
      return { data, error };

    } catch (error) {
      return { error };
    }
  }
  
  
    
      static async removerTema(mesaId, temaId) {
        try {
    
          const {data, error} = await supabase
          .from('mesatema')
          .delete()
          .eq('idmesa', mesaId)
          .eq('idtema', temaId);
                  
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

      static async listarTemasMesa(mesaId){
        try {
    
            const data = await supabase
            .from('mesatema')
            .select('idtema')
            .eq('idmesa', mesaId);
                    
            return data;
          } catch (error) {
            return { error };
          }
      }

      static async buscarTemaMesa(mesaId, temaId){
        try {
    
            const data = await supabase
            .from('mesatema')
            .select('*')
            .eq('idmesa', mesaId)
            .eq('idtema', temaId);
                    
            return data;
          } catch (error) {
            return { error };
          }
      }

}

module.exports = mesatemaModel;