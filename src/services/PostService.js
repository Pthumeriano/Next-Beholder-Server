const PostModel = require('../models/PostModel');
const UsuarioModel = require('../models/UsuarioModel');

class PostService {
  static async criarPost(dados) {
    try {

      return await PostModel.criarPost(dados);
    } catch (error) {
      return { error: 'Erro ao criar post' };
    }
  }

  static async listarPosts() {
    try {

      return await PostModel.listarPosts();
    } catch (error) {
      return { error: 'Erro ao listar posts' };
    }
  }

  static async excluirPost(usuarioAutenticado, idPost){
    try {

      const usuario = await PostModel.verificarAutorPost(idPost, usuarioAutenticado); 

      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Você não tem permissão para excluir este post' };
      }

        return await PostModel.excluirPost(idPost);
    } catch (error) {
        return { error: 'Erro ao excluir post' };
    }
  }

  static async editarPost(usuarioAutenticado, idPost, novosDados){
    try {
       
      const usuario = await PostModel.verificarAutorPost(idPost, usuarioAutenticado);

      if (!usuario.data || usuario.data.length === 0) {
        return { error: 'Você não tem permissão para alterar este post' };
      }

        return await PostModel.editarPost(idPost, novosDados);
    } catch (error) {
        return { error: 'Erro ao editar post' };
    }
  }

  static async buscarPost(idPost){
    try {
        
        return await PostModel.buscarPost(idPost);
    } catch (error) {
        return { error: 'Erro ao listar posts' };
    }
  }



}

module.exports = PostService;
