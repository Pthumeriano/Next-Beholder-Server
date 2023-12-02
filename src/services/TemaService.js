const TemaModel = require("../models/TemaModel");

class TemaService{
    static async listarTemas(){
        return TemaModel.listarTemas();
    }


    static async buscarTema(id){
        return TemaModel.buscarTema(id);
    }

    static async buscarTemaNome(nome){
        return TemaModel.buscarTemaNome(nome);
    }
}

module.exports = TemaService;