const MesaTemaModel = require('../models/MesaTemaModel');
const MesaModel = require('../models/MesaModel');
const TemaModel = require('../models/TemaModel');


class MesaTemaService {

    static async adicionarTema(mesaId, temaId, usuarioAutenticado){

        try {

            const mestre = await MesaModel.buscarMesaMestre(usuarioAutenticado, mesaId);

        if (!mestre.data || mestre.data.length === 0) {
            return {error: "Você não tem permissão para adicionar temas à esta mesa"};
        }

        const temaAdicionado = await MesaTemaModel.buscarTemaMesa(mesaId, temaId);

        if (temaAdicionado.data.length > 0) {
            return {error: "Tema já adicionado"};
        }

        const tema = await TemaModel.buscarTema(temaId);

        if (!tema.data || tema.data.length === 0) {
            return {error: "Tema não encontrado"};
        }
 
        return await MesaTemaModel.adicionarTema(mesaId, temaId);
        } catch (error) {
            return { error: 'Erro inesperado' };
        }

        
    }

    static async removerTema(mesaId, temaId, usuarioAutenticado){

        try {

            const mestre = await MesaModel.buscarMesaMestre(usuarioAutenticado, mesaId);

            if (!mestre.data || mestre.data.length === 0) {
                return {error: "Você não tem permissão para remover temas desta mesa"};
            }
    
            const tema = await MesaTemaModel.buscarTemaMesa(mesaId, temaId);
    
            if (!tema.data || tema.data.length === 0) {
                return {error: "Tema não encontrado"};
            }
    
            return await MesaTemaModel.removerTema(mesaId, temaId);

        } catch (error) {
            return { error: 'Erro inesperado' };
        }


    }

    static async listarTemasMesa(mesaId){

        try {
            
            const result = await MesaTemaModel.listarTemasMesa(mesaId);

            if (!result.data || result.data.length === 0) {
                return {error: "Nenhum tema adicionado"};
            }
    
            return result;
        } catch (error) {
            return { error: 'Erro inesperado' };
        }

    }

}

module.exports = MesaTemaService;