const AvalicaoModel = require("../models/AvaliacaoModel");

class AvaliacaoService {
  static async avaliar(usuarioId, xp, avaliador) {
    if (avaliador != usuarioId) {
      return await AvalicaoModel.avaliar(usuarioId, xp);
    }
    return { error: "Não é possível se avaliar" };
  }

  static async listarAvaliacoesUsuario(usuarioId) {
    return await AvalicaoModel.listarAvaliacoesUsuario(usuarioId);
  }
}

module.exports = AvaliacaoService;
