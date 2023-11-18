const supabase = require('../config/supabase');

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

          return await supabase
          .from('usuariotema')
          .delete()
          .eq('idusuario', usuarioId)
          .eq('idtema', temaId);

        } catch (error) {
          return { error };
        }
      }

      static async verificarTema(usuarioId, temaId) {
        try {

          return await supabase
          .from('usuariotema')
          .select("*")
          .eq('idusuario', usuarioId)
          .eq('idtema', temaId);

        } catch (error) {
          return { error };
        }
      }

      static async listarTemasUsuario(usuarioId) {
        try {

          
          let { data: usuariotema, error } = await supabase
          .from('usuariotema')
          .select('*')
          .eq('idusuario', usuarioId);
        
          return usuariotema;
        } catch (error) {
          return { error: error.message };
        }
      }

}

module.exports = UsuarioTemaModel;