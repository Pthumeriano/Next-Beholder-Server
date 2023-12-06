const UsuarioMesaModel = require("../models/UsuarioMesaModel");

class UsuarioMesaService {
  static async adicionarUsuarioNaMesa(usuarioId, mesaId) {
    // Verifique se o usuário já está na mesa
    const { data: mesasDoUsuario } =
      await UsuarioMesaModel.listarMesasDoUsuario(usuarioId);
    if (
      mesasDoUsuario &&
      mesasDoUsuario.some((mesa) => mesa.idmesa === mesaId)
    ) {
      return { error: "Usuário já está na mesa" };
    }

    const { data, error } = await UsuarioMesaModel.adicionarUsuarioNaMesa(
      usuarioId,
      mesaId
    );
    return { data, error };
  }

  static async removerUsuarioDaMesa(usuarioId, mesaId) {
    // Verifique se o usuário está na mesa
    const { data: mesasDoUsuario } =
      await UsuarioMesaModel.listarMesasDoUsuario(usuarioId);
    if (
      !mesasDoUsuario ||
      !mesasDoUsuario.some((mesa) => mesa.idmesa === mesaId)
    ) {
      return { error: "Usuário não está na mesa" };
    }

    const { data, error } = await UsuarioMesaModel.removerUsuarioDaMesa(
      usuarioId,
      mesaId
    );
    return { data, error };
  }

  static async listarUsuarioMesa() {
    return (await UsuarioMesaModel.listarUsuarioMesa()).data;
  }

  static async listarUsuariosDaMesa(mesaId) {
    return (await UsuarioMesaModel.listarUsuariosDaMesa(mesaId)).data;
  }

  static async listarMesasDoUsuario(usuarioId) {
    return (await UsuarioMesaModel.listarMesasDoUsuario(usuarioId)).data;
  }
}

module.exports = UsuarioMesaService;
