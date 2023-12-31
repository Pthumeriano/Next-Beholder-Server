const supabase = require("../config/supabase");

class TemaModel {
  static async listarTemas() {
    try {
      const temas = await supabase.from("tema").select("*");

      return temas;
    } catch (error) {
      return { error };
    }
  }

  static async buscarTema(id) {
    try {
      const temas = await supabase.from("tema").select("*").eq("id", id);

      return temas;
    } catch (error) {
      return { error };
    }
  }

  static async buscarTemaNome(nome) {
    try {
      const tema = await supabase.from("tema").select("*").eq("nome", nome);

      return tema;
    } catch (error) {
      return { error };
    }
  }
}

module.exports = TemaModel;
