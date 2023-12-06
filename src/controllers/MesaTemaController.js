const MesaTemaService = require('../services/MesaTemaService')

const listarTemasMesa = async (req, res) => {
    try {

        const {data, error} = await MesaTemaService.listarTemasMesa(req.params.id);

        if (error) {
            throw new Error(`Erro ao listar temas da mesa: ${error}`);
        }
          res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const adicionarTema = async (req, res) => {
    try {

        const {data, error} = await MesaTemaService.adicionarTema(req.params.id, req.body.idTema, req.usuarioAutenticado.userId);

        if (error) {
            throw new Error(`Erro ao adicionar tema à mesa: ${error}`);
        }
          res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removerTema = async (req, res) => {
    try {

        const {data, error} = await MesaTemaService.removerTema(req.params.id, req.body.idTema, req.usuarioAutenticado.userId);

        if (error) {
            throw new Error(`Erro ao remover tema da mesa: ${error}`);
        }
        res.json(data);

    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarTemasMesa,
    adicionarTema,
    removerTema
}