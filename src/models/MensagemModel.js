const supabase = require("../config/supabase");

class MensagemModel {
  static async criarMensagem(autor, chat, texto) {
    console.log("Autor: ", autor);
    console.log("Chat: ", chat);
    console.log("Texto: ", texto);
    try {
      const { data, error } = await supabase.from("mensagem").upsert(
        [
          {
            autor,
            chat,
            texto,
          },
        ],
        { returning: "representation" }
      );

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async lerMensagem(id) {
    try {
      return await supabase.from("mensagem").select("*").eq("id", id);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarMensagens() {
    try {
      return await supabase.from("mensagem").select("*");
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarMensagensChat(chat) {
    try {
      return await supabase.from("mensagem").select("*").eq("chat", chat);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async listarMensagensAutor(autor) {
    try {
      return await supabase.from("mensagem").select("*").eq("autor", autor);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async verificarAutor(autor, mensagemId) {
    try {
      return await supabase
        .from("mensagem")
        .select("*")
        .eq("autor", autor)
        .eq("id", mensagemId);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async editarMensagem(id, novoTexto) {
    try {
      const { data, error } = await supabase
        .from("mensagem")
        .update({ texto: novoTexto })
        .eq("id", id);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async excluirMensagem(id) {
    try {
      return await supabase.from("mensagem").delete().eq("id", id);
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = MensagemModel;
