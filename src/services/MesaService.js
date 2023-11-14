const jwt = require('jsonwebtoken');
const MesaModel = require('../models/MesaModel');

class MesaService {

    static async listarMesas() {
        return await MesaModel.listarMesas();
      }

      static async criarMesa(mesa) {
        return await MesaModel.criarMesa(mesa);
      }
      
}

module.exports = MesaService;