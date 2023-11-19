const PostService = require('../services/PostService');

const criarPost = async (req, res) => {
  try {

    const dados = req.body;
    dados.idautor = req.usuarioAutenticado.userId;

    const result = await PostService.criarPost(dados);

    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ mensagem: 'Post criado com sucesso', post: result.data[0] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarPosts = async (req, res) => {
  try {

    const result = await PostService.listarPosts();

    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ posts: result.data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarPost = async (req, res) => {
    try {


        const { id: postId } = req.params;
        const result = await PostService.editarPost(req.usuarioAutenticado.userId, postId, req.body);
    
        if (result.error) {
          res.status(400).json({ error: result.error });
        } else {
          res.json({ posts: result.data });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const excluirPost = async (req, res) => {
    try {

        const result = await PostService.excluirPost(req.usuarioAutenticado.userId, req.params.id);
    
        if (result.error) {
          res.status(400).json({ error: result.error });
        } else {
          res.json({ posts: result.data });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const buscarPost = async (req, res) => {
    try {

        const result = await PostService.buscarPost(req.params.id);
    
        if (result.error) {
          res.status(400).json({ error: result.error });
        } else {
          res.json({ posts: result.data });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}



module.exports = {
  criarPost,
  listarPosts,
  editarPost,
  excluirPost,
  buscarPost
  
};
