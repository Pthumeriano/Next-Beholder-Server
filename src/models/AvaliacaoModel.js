const supabase = require('../config/supabase');

class AvalicaoModel{

    static async avaliar(usuarioId, xp){
        try {

            const { data, error } = await supabase
              .from('avaliacao')
              .insert([
                { 'idusuario': usuarioId, 'xp': xp },
              ])
              .select()

            return { data, error };
        } catch (error) {
            return { error: error.message };
        }
    }

    static async listarAvaliacoesUsuario(usuarioId){
        try {

            const { data, error } = await supabase
              .from('avaliacao')
              .select('*')
              .eq('idusuario', usuarioId);

            return { data, error };
        } catch (error) {
            return { error: error.message };
        }
    }

}

module.exports = AvalicaoModel;