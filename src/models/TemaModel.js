class TemaModel{

    static async listarTemas(){
        try {
    
            const { error } = await supabase
            .from('tema')
            .select();

            return { data, error };
          } catch (error) {
            return { error };
          }
      }
      
}

module.exports = TemaModel;