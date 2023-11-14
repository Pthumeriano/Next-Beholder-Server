const jwt = require('jsonwebtoken');
const MesaModel = require('../models/MesaModel');

class MesaService {
    static async listarMesas() {
        return await MesaModel.listarMesas();
      }
}

module.exports = MesaService;