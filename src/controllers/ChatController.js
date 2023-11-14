/*
  todo chat tem um mestre associado, se o usuario apagar a conta, o banco apaga todos os chats associados
*/


const ChatService = require('../services/ChatService');

const listarChats = async (req, res) => {
    try {
        const {data, error} = await ChatService.listarChats();

        if(error){
            throw new Error(`Erro ao listar chats: ${error.message}`);
        }
        res.json(data)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const buscarChat = async (req, res) => {
    try {
        
        const {data, error} = await ChatService.buscarChat(req.body.id);

        if(error){
            throw new Error(`Erro ao buscar chat: ${error.message}`);
        }
        res.json(data)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const excluirChat = async (req, res) => {
    try {
        const result = await ChatService.excluirChat(req.body.id, req.cookies.BeholderToken);
    
        if (result.error) {
          throw new Error(`Erro ao excluir chat: ${result.error}`);
        }
    
        res.json({ mensagem: 'Chat excluído com sucesso!' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const criarChat = async (req, res) => {
    try {

        const result = await ChatService.criarChat(req.cookies.BeholderToken);
    
        if (result.error) {
          throw new Error(`Erro ao criar chat: ${result.error}`);
        }
    
        res.json({ mensagem: 'Chat criado com sucesso!' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

module.exports = {
    listarChats,
    buscarChat,
    excluirChat,
    criarChat
}