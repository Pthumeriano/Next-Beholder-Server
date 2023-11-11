const UsuarioModel = require('../models/UsuarioModel');

class UsuarioService {
  static async listarUsuarios() {
    return await UsuarioModel.listarUsuarios();
  }

  static async buscarUsuarioPorId(id) {
    return await UsuarioModel.buscarUsuarioPorId(id);
  }
}

module.exports = UsuarioService;
