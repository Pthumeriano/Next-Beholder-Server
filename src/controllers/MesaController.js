const MesaService = require('../services/MesaService');

const listarMesas = async (req, res) => {
    try {
        const {data, error} = await MesaService.listarMesas();

        if(error){
            throw new Error(`Erro ao listar mesas: ${error.message}`);
        }
        res.json(data)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    listarMesas
}