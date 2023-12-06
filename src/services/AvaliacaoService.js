const AvalicaoModel = require('../models/AvaliacaoModel')

class AvaliacaoService{
    static async avaliar(usuarioId, xp, avaliador){
        console.log(usuarioId);
        console.log(xp)
        console.log(avaliador)
        if(avaliador != usuarioId){
            return await AvalicaoModel.avaliar(usuarioId, xp);
        }
        return {error: 'Não é possível se avaliar'}
    }

    static async listarAvaliacoesUsuario(usuarioId){
        return await AvalicaoModel.listarAvaliacoesUsuario(usuarioId);
    }
}

module.exports = AvaliacaoService;