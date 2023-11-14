/*
  A mesa tem um chat, precisa chamar a criação do chat na hora de criar a mesa e passar o id pro serviço da Mesa
*/

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