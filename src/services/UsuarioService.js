const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UsuarioMesaModel = require("../models/UsuarioMesaModel");
const UsuarioChatModel = require("../models/UsuarioChatModel");
const MesaModel = require("../models/MesaModel");
const UsuarioModel = require("../models/UsuarioModel");
const TemaModel = require("../models/TemaModel");
const UsuarioTemaModel = require("../models/UsuarioTemaModel");

class UsuarioService {
  static async listarUsuarios() {
    return await UsuarioModel.listarUsuarios();
  }

  static async buscarUsuario(id) {
    return await UsuarioModel.buscarUsuario(id);
  }

  static async criarNovoUsuario(email, novoUsuario) {
    const usuario = await UsuarioModel.buscarUsuarioEmail(email);

    if (usuario.data && usuario.data.length > 0) {
      return { error: "Email já cadastrado" };
    }

    return await UsuarioModel.criarNovoUsuario(novoUsuario);
  }

  static async atualizarSenha(senhaAntiga, novaSenha, usuarioAutenticado) {
    try {
      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(
        usuarioAutenticado,
        senhaAntiga
      );

      if (!usuario.data || usuario.data.length === 0) {
        return { error: "Usuário não encontrado ou senha incorreta" };
      }

      const result = await UsuarioModel.atualizarSenha(
        usuarioAutenticado,
        novaSenha
      );

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async atualizarEmail(id, email, senha, novoEmail) {
    try {
      const usuario = await UsuarioModel.buscarUsuarioEmailSenha(email, senha);

      if (!usuario.data || usuario.data.length === 0) {
        return { error: "Usuário não encontrado ou senha incorreta" };
      }

      const emailExistente = await UsuarioModel.buscarUsuarioEmail(novoEmail);

      if(emailExistente.data){
        return {error: "Email já cadastrado"};
      }

      // Atualiza o email
      const result = await UsuarioModel.atualizarEmail(id, novoEmail);

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async atualizarUsuario(usuarioAutenticado, novosDados) {
    try {
      const usuario = await UsuarioModel.buscarUsuario(usuarioAutenticado);

      if (!usuario.data || usuario.data.length === 0) {
        return { error: "Usuário não encontrado" };
      }

      const result = await UsuarioModel.atualizarUsuario(
        usuarioAutenticado,
        novosDados
      );

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async excluirUsuario(usuarioAutenticado, senha) {
    try {
      const userId = usuarioAutenticado;

      const usuario = await UsuarioModel.buscarUsuarioPoridSenha(userId, senha);

      if (!usuario.data || usuario.data.length === 0) {
        return { error: "Usuário não encontrado ou senha incorreta" };
      }

      const result = await UsuarioModel.excluirUsuarioPorId(userId);

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async login(email, senha, res) {
    try {
      const usuario = await UsuarioModel.buscarUsuarioEmail(email);
  
      if (!usuario.data || usuario.data.length === 0) {
        return { error: "Credenciais inválidas" };
      }
  
      const senhaCorreta = await bcrypt.compare(senha, usuario.data[0].senha);
  
      if (!senhaCorreta) {
        return { error: "Credenciais inválidas" };
      }
  
      // Gera um token JWT usando a variável de ambiente
      const token = jwt.sign(
        { userId: usuario.data[0].id },
        process.env.SECRET_KEY,
        {
          expiresIn: "30d", // Token válido por 30 dias
        }
      );
  
      // Adiciona o token ao cookie
      const cookieOptions = {
        httpOnly: false,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Cookie válido por 30 dias
        secure: true, // Apenas enviar cookies através de conexões HTTPS
        sameSite: "None", // Ajustado para "None" em vez de "none"
        path: "/"
      };
      const cookieName = "BeholderToken"; // Nome do cookie conforme padrões de nomeação
  
      // Adiciona o cookie à resposta
      res.cookie(cookieName, token, cookieOptions);
  
      return { mensagem: "Login bem-sucedido", usuario: usuario.data[0], token }; // Adiciona o token ao retorno
    } catch (error) {
      return { error: `Erro ao fazer login: ${error.message}` };
    }
  }
  
  


  static async entrarNaMesa(usuarioId, mesaId) {
    try {
      // Verificar se o usuário já está na mesa
      const verificarUsuarioMesa = await UsuarioMesaModel.buscarUsuarioMesa(
        usuarioId,
        mesaId
      );

      if (verificarUsuarioMesa.data.length > 0) {
        return { mensagem: "Bem-vindo(a) de volta!" };
      }

      // Verificar se há vagas disponíveis na mesa
      const vagasDisponiveis = await MesaModel.verificarVagasDisponiveis(
        mesaId
      );
      if (vagasDisponiveis <= 0) {
        return { error: "Não há vagas disponíveis na mesa" };
      }

      // Buscar o chatId
      const resultadoBuscarChat = await MesaModel.buscarChatMesa(mesaId);

      if (resultadoBuscarChat.error) {
        console.error(
          "Erro ao buscar chat da mesa:",
          resultadoBuscarChat.error
        );
        return { error: "Erro ao buscar chat da mesa" };
      }

      const chatId = resultadoBuscarChat.chatId;

      // Adicionar usuário à mesa
      const resultadoEntradaMesa =
        await UsuarioMesaModel.adicionarUsuarioNaMesa(usuarioId, mesaId);
      if (resultadoEntradaMesa.error) {
        console.error(
          "Erro ao adicionar usuário à mesa:",
          resultadoEntradaMesa.error
        );
        return { error: "Erro ao adicionar usuário à mesa" };
      }

      // Atualizar a contagem de vagas na mesa
      const resultadoAtualizacaoVagas =
        await MesaModel.atualizarVagasDisponiveis(mesaId);
      if (resultadoAtualizacaoVagas.error) {
        console.error(
          "Erro ao atualizar a contagem de vagas na mesa:",
          resultadoAtualizacaoVagas.error
        );
        // Se ocorrer um erro na atualização, reverta a entrada do usuário.
        await UsuarioMesaModel.removerUsuarioDaMesa(usuarioId, mesaId);
        return { error: "Erro ao atualizar a contagem de vagas na mesa" };
      }

      // Associar usuário ao chat da mesa
      const resultadoAssociacaoChat =
        await UsuarioChatModel.adicionarUsuarioNoChat(usuarioId, chatId);
      if (resultadoAssociacaoChat.error) {
        console.error(
          "Erro ao associar usuário ao chat:",
          resultadoAssociacaoChat.error
        );
        // Se ocorrer um erro na associação, reverta a entrada do usuário e a atualização de vagas.
        await UsuarioMesaModel.removerUsuarioDaMesa(usuarioId, mesaId);
        await MesaModel.atualizarVagasDisponiveis(mesaId, 1);
        return { error: "Erro ao associar usuário ao chat da mesa" };
      }

      return { mensagem: "Usuário entrou na mesa com sucesso" };
    } catch (error) {
      console.error("Erro ao entrar na mesa:", error.message);
      return { error: error.message };
    }
  }

  static async sairDaMesa(usuarioId, mesaId) {
    try {
      // Verificar se o usuário está na mesa
      const usuarioNaMesa = await UsuarioMesaModel.listarMesasDoUsuario(
        usuarioId
      );
      if (
        !usuarioNaMesa.data ||
        !usuarioNaMesa.data.some((m) => m.idmesa === mesaId)
      ) {
        return { error: "O usuário não está na mesa" };
      }

      const resultadoBuscarChat = await MesaModel.buscarChatMesa(mesaId);

      if (resultadoBuscarChat.error) {
        console.error(
          "Erro ao buscar chat da mesa:",
          resultadoBuscarChat.error
        );
        return { error: "Erro ao buscar chat da mesa" };
      }

      const chatId = resultadoBuscarChat.chatId;

      // Remover o usuário da mesa
      const resultadoRemoverUsuario =
        await UsuarioMesaModel.removerUsuarioDaMesa(usuarioId, mesaId);
      if (resultadoRemoverUsuario.error) {
        console.error(
          "Erro ao remover usuário da mesa:",
          resultadoRemoverUsuario.error
        );
        return { error: "Erro ao remover usuário da mesa" };
      }

      // Desassociar usuário ao chat da mesa
      const resultadoAssociacaoChat =
        await UsuarioChatModel.removerUsuarioDoChat(usuarioId, chatId);
      if (resultadoAssociacaoChat.error) {
        console.error(
          "Erro ao desassociar usuário ao chat:",
          resultadoAssociacaoChat.error
        );
        return { error: "Erro ao desassociar usuário ao chat da mesa" };
      }

      // Verificar se o usuário é o mestre da mesa
      const mesaInfo = await MesaModel.buscarMesaMestre(usuarioId, mesaId);
      if (mesaInfo.error) {
        console.error("Erro ao buscar informações da mesa:", mesaInfo.error);
        return { error: "Erro ao buscar informações da mesa" };
      }

      // Se o usuário for o mestre, exclua a mesa
      if (mesaInfo.data.length > 0) {
        const resultadoExcluirMesa = await MesaModel.excluirMesa(mesaId);
        if (resultadoExcluirMesa.error) {
          console.error("Erro ao excluir a mesa:", resultadoExcluirMesa.error);
          return { error: "Erro ao excluir a mesa" };
        }
      } else {
        // Se não for o mestre, apenas atualize a contagem de vagas na mesa
        const resultadoAtualizacaoVagas = await MesaModel.adicionarVaga(mesaId);
        if (resultadoAtualizacaoVagas.error) {
          console.error(
            "Erro ao atualizar a contagem de vagas na mesa:",
            resultadoAtualizacaoVagas.error
          );
          return { error: "Erro ao atualizar a contagem de vagas na mesa" };
        }
      }

      return { mensagem: "Usuário saiu da mesa com sucesso" };
    } catch (error) {
      console.error("Erro ao sair da mesa:", error.message);
      return { error: error.message };
    }
  }

  static async adicionarTema(usuarioId, temaId) {
    try {
      // Verificar se o tema existe
      const tema = await TemaModel.buscarTema(temaId);

      if (!tema.data || tema.data.length === 0) {
        return { error: "Tema inválido" };
      }

      // Verificar se o tema já foi adicionado ao usuário
      const temaAdicionado = await UsuarioTemaModel.verificarTema(
        usuarioId,
        temaId
      );

      if (temaAdicionado.data.length > 0) {
        return { error: "Tema já adicionado" };
      }

      // Adicionar tema ao usuário
      const resultadoAdicao = await UsuarioTemaModel.adicionarTema(
        usuarioId,
        temaId
      );

      return resultadoAdicao;
    } catch (error) {
      return { error: "Erro ao adicionar tema" };
    }
  }

  static async removerTema(usuarioId, temaId) {
    try {
      // Verificar se o tema existe
      const tema = await TemaModel.buscarTema(temaId);

      if (!tema.data || tema.data.length === 0) {
        return { error: "Tema inválido" };
      }

      // Verificar se o tema já foi adicionado ao usuário
      const temaAdicionado = await UsuarioTemaModel.verificarTema(
        usuarioId,
        temaId
      );

      if (temaAdicionado.data.length === 0) {
        return { error: "Tema não adicionado" };
      }

      return await UsuarioTemaModel.removerTema(usuarioId, temaId);
    } catch (error) {
      return { error: "Erro ao remover tema" };
    }
  }

  static async listarTemasUsuario(usuarioId) {
    try {
      return await UsuarioTemaModel.listarTemasUsuario(usuarioId);
    } catch (error) {
      return { error: "Erro ao listar temas do usuário" };
    }
  }

  static async listarTemasTodosUsuarios() {
    try {
      const usuarioTema = await UsuarioTemaModel.listarTemasTodosUsuarios();
      const temas = await TemaModel.listarTemas();
      const mapUsuarioTema = {};

      for (let temaDoUsuario of usuarioTema) {
        const tema = temas.data.find(
          (tema) => tema.id === temaDoUsuario.idtema
        );
        if (!(temaDoUsuario.idusuario in mapUsuarioTema)) {
          mapUsuarioTema[temaDoUsuario.idusuario] = [];
        }
        mapUsuarioTema[temaDoUsuario.idusuario].push(tema.nome);
      }

      return mapUsuarioTema;
    } catch (error) {
      return { error: "Erro ao listar todos os temas dos usuários" };
    }
  }

  static async listarTemas() {
    try {
      const temas = await TemaModel.listarTemas();
      return temas.data;
    } catch (error) {
      return { error: "Erro ao listar temas" };
    }
  }
}

module.exports = UsuarioService;
