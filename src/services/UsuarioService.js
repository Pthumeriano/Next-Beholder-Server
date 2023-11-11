const UsuarioModel = require('../models/UsuarioModel');

class UsuarioService {
  static async listarUsuarios() {
    return await UsuarioModel.listarUsuarios();
  }

  static async buscarUsuarioPorId(id) {
    return await UsuarioModel.buscarUsuarioPorId(id);
  }

  static async criarNovoUsuario(usuario){
    return await UsuarioModel.criarNovoUsuario(usuario);
  }

}

module.exports = UsuarioService;
