const supabase = require('../config/supabase');

class UsuarioMesaModel {
  static async adicionarUsuarioNaMesa(usuarioId, mesaId) {
    try {
      const { data, error } = await supabase
        .from('usuariomesa')
        .upsert([{ idusuario: usuarioId, idmesa: mesaId }]);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async removerUsuarioDaMesa(usuarioId, mesaId) {
    try {
      const { data, error } = await supabase
        .from('usuariomesa')
        .delete()
        .eq('idusuario', usuarioId)
        .eq('idmesa', mesaId);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarMesasDoUsuario(usuarioId) {
    try {
      const { data, error } = await supabase
        .from('usuariomesa')
        .select('idmesa')
        .eq('idusuario', usuarioId);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Outros métodos, se necessário
}

module.exports = UsuarioMesaModel;
