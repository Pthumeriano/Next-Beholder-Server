
const supabase = require('../config/supabase');

class PostModel {

    static async criarPost(dados) {
        try {
          const { data, error } = await supabase
            .from('post')
            .insert([dados])
            .select();
          
          return { data, error };
        } catch (error) {
          return { error: error.message };
        }
      }

  static async listarPosts() {
    try {
      return await supabase.from('post').select('*');
    } catch (error) {
      return { error: error.message };
    }
  }

  static async excluirPost(idPost){
    try {
        const { data, error } = await supabase
          .from('post')
          .delete()
          .eq('id',idPost);
  
        return { data, error };
      } catch (error) {
        return { error: error.message };
      }
  }

  static async editarPost(idPost, novosDados){
    try {

        const { data, error } = await supabase
          .from('post')
          .update(novosDados)
          .eq('id', idPost);
  
        return { data, error };
      } catch (error) {
        return { error: error.message };
      }
  }

  static async buscarPost(idPost){
    try {
        const { data, error } = await supabase
          .from('post')
          .select('*')
          .eq('id',idPost);
  
        return { data, error };
      } catch (error) {
        return { error: error.message };
      }
  }

 
}

module.exports = PostModel;
