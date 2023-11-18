class mesatemaModel{

    static async adicionarTema(mesaId, temaId) {
        try {
    
          const { data, error } = await supabase
            .from('mesatema')
            .insert([
            { 'idmesa': mesaId, 'idtema': temaId },
            ])
            .select()
            
          return { data, error };
        } catch (error) {
          return { error };
        }
      }
    
      static async removerTema(mesaId, temaId) {
        try {
    
          const { error } = await supabase
          .from('mesatema')
          .delete()
          .eq('idmesa', mesaId)
          .eq('idtema', temaId);
                  
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

      static async listarTemas(mesaId){
        try {
    
            const { error } = await supabase
            .from('mesatema')
            .select()
            .eq('idmesa', mesaId);
                    
            return { data, error };
          } catch (error) {
            return { error };
          }
      }

}

module.exports = mesatemaModel;