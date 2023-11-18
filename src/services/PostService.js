const PostModel = require('../models/PostModel');

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

  static async excluirPost(idPost){
    try {

        return await PostModel.excluirPost(idPost);
    } catch (error) {
        return { error: 'Erro ao excluir post' };
    }
  }

  static async editarPost(idPost, novosDados){
    try {
        
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
