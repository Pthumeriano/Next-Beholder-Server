const MensagemService = require('../services/MensagemService');

const listarMensagens = async (req, res) => {
    try {
        const {data, error} = await MensagemService.listarMensagens();

        if(error){
            throw new Error(`Erro ao listar mensagens: ${error.message}`);
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const listarMensagensChat = async (req, res) => {
    try {

        const { id: chatId } = req.params;
        const {data, error} = await MensagemService.listarMensagensChat(req.usuarioAutenticado.userId, chatId);

        if(error){
            throw new Error(`Erro ao listar mensagens: ${error.message}`);
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const enviarMensagemChat = async (req, res) => {
    try {

        const { id: chatId } = req.params;
        const {data, error} = await MensagemService.enviarMensagem(req.usuarioAutenticado.userId, chatId, req.body.mensagem);

        if(error){
            throw new Error(`Erro ao listar mensagens: ${error.message}`);
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editarMensagemChat = async (req, res) => {
    try {

        const { id: mensagemId } = req.params;
        const {data, error} = await MensagemService.editarMensagem(req.usuarioAutenticado.userId, mensagemId, req.body.texto)

        if(error){
            throw new Error(`Erro ao editar mensagem: ${error.message}`);
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const excluirMensagemChat = async (req, res) => {
    try {

        const { id: mensagemId } = req.params;
        const {data, error} = await MensagemService.excluirMensagem(req.usuarioAutenticado.userId, mensagemId)

        if(error){
            throw new Error(`Erro ao excluir mensagem: ${error.message}`);
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    listarMensagens,
    listarMensagensChat,
    enviarMensagemChat,
    editarMensagemChat,
    excluirMensagemChat
}