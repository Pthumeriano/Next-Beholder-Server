const AvaliacaoService = require('../services/AvaliacaoService');

const avaliar = async (req, res) => {
    try {

        const {data, error} = await AvaliacaoService.avaliar(req.body.id, req.body.xp, req.usuarioAutenticado.userId);

        if (error) {
            throw new Error(`Erro ao avaliar usuário: ${error}`);
        }
          res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const listarAvaliacoesUsuario = async (req, res) => {
    try {

        const {data, error} = await AvaliacaoService.listarAvaliacoesUsuario(req.usuarioAutenticado.userId);

        if (error) {
            throw new Error(`Erro ao listar avaliações do usuário: ${error}`);
        }
          res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


module.exports = {
    avaliar,
    listarAvaliacoesUsuario
}