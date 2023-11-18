class UsuarioTemaModel{

    static async adicionarTema(usuarioId, temaId) {
        try {
    
          const { data, error } = await supabase
            .from('usuariotema')
            .insert([
            { 'idusuario': usuarioId, 'idtema': temaId },
            ])
            .select()
            
          return { data, error };
        } catch (error) {
          return { error };
        }
      }
    
      static async removerTema(usuarioId, temaId) {
        try {
    
          const { error } = await supabase
          .from('usuariotema')
          .delete()
          .eq('idusuario', usuarioId)
          .eq('idtema', temaId);
                  
          return { data, error };
        } catch (error) {
          return { error };
        }
      }

      static async listarTemas(usuarioId){
        try {
    
            const { error } = await supabase
            .from('usuariotema')
            .select()
            .eq('idusuario', usuarioId);
                    
            return { data, error };
          } catch (error) {
            return { error };
          }
      }

}

module.exports = UsuarioTemaModel;