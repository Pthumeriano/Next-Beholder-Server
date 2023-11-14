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


module.exports = {
    listarChats
}