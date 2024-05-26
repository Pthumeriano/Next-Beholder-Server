const UsuarioService = require("../services/UsuarioService");

const listarUsuarios = async (req, res) => {
  try {
    const { data, error } = await UsuarioService.listarUsuarios();
    if (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarUsuario = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { data, error } = await UsuarioService.buscarUsuario(userId);
    if (error) {
      throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
    }

    if (!data) {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarNovoUsuario = async (req, res) => {
  try {
    const { email } = req.body;
    const { data, error } = await UsuarioService.criarNovoUsuario(
      email,
      req.body
    );

    if (error) {
      throw new Error(`Erro ao criar novo usuário: ${error}`);
    }

    res.json({ mensagem: "Novo usuário criado com sucesso!", usuario: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarSenha = async (req, res) => {
  try {
    const { senhaAntiga, novaSenha } = req.body;

    // Chama o serviço para atualizar a senha
    const result = await UsuarioService.atualizarSenha(
      senhaAntiga,
      novaSenha,
      req.usuarioAutenticado.userId
    );

    if (result.error) {
      throw new Error(`Erro ao atualizar a senha: ${result.error}`);
    }

    res.json({
      mensagem: "Senha atualizada com sucesso!",
      usuario: result.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const novosDados = req.body;
    const userId = req.usuarioAutenticado.userId;

    const result = await UsuarioService.atualizarUsuario(userId, novosDados);

    if (result.error) {
      throw new Error(`Erro ao alterar usuário: ${result.error}`);
    }

    res.json({
      mensagem: "Usuário alterado com sucesso!",
      usuario: result.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const atualizarEmail = async (req, res) => {
  try {
    const { senha, email } = req.body;

    const result = await UsuarioService.atualizarEmail(
      req.usuarioAutenticado.userId,
      req.usuarioAutenticado.email,
      senha,
      email
    );

    if (result.error) {
      throw new Error(`Erro ao alterar e-mail: ${result.error}`);
    }

    res.json({
      mensagem: "E-mail alterado com sucesso!",
      usuario: result.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const excluirUsuario = async (req, res) => {
  try {
    const { senha } = req.body;

    const result = await UsuarioService.excluirUsuario(
      req.usuarioAutenticado.userId,
      senha
    );

    if (result.error) {
      throw new Error(`Erro ao excluir usuário: ${result.error}`);
    }

    res.json({ mensagem: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  console.log("Tentativa de login")
  const result = await UsuarioService.login(email, senha, res);

  if (result.error) {
    res.status(401).json({ error: result.error });
  } else {
    res.json(result);
  }
};

const entrarNaMesa = async (req, res) => {
  try {
    const { mesaId } = req.params;
    const userId = req.usuarioAutenticado.userId;

    const resultadoEntradaMesa = await UsuarioService.entrarNaMesa(
      userId,
      mesaId
    );

    if (resultadoEntradaMesa.error) {
      throw new Error(`Erro ao entrar na mesa: ${resultadoEntradaMesa.error}`);
    }

    res.json({ mensagem: "Entrada na mesa realizada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sairDaMesa = async (req, res) => {
  try {
    const { mesaId } = req.params;
    const userId = req.usuarioAutenticado.userId;

    const resultadoEntradaMesa = await UsuarioService.sairDaMesa(
      userId,
      mesaId
    );

    console.log("mesaID ", mesaId)
    console.log("user id ", userId)

    if (resultadoEntradaMesa.error) {
      throw new Error(`Erro ao sair na mesa: ${resultadoEntradaMesa.error}`);
    }

    res.json({ mensagem: "Saída da mesa realizada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adicionarTema = async (req, res) => {
  try {
    const temaId = req.params.idtema;
    const userId = req.usuarioAutenticado.userId;

    const result = await UsuarioService.adicionarTema(userId, temaId);

    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ mensagem: "Tema adicionado com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removerTema = async (req, res) => {
  try {
    const temaId = req.params.idtema;
    const userId = req.usuarioAutenticado.userId;

    const result = await UsuarioService.removerTema(userId, temaId);

    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.json({ mensagem: "Tema removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarTemas = async (req, res) => {
  try {
    const temas = await UsuarioService.listarTemas();

    res.json(temas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarTemasUsuario = async (req, res) => {
  try {
    const userId = req.usuarioAutenticado.userId;

    const temas = await UsuarioService.listarTemasUsuario(userId);

    res.json(temas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarTemasDoUsuario = async (req, res) => {
  try {
    const temas = await UsuarioService.listarTemasUsuario(req.params.idusuario);

    res.json(temas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarTemasTodosUsuarios = async (req, res) => {
  try {
    const temas = await UsuarioService.listarTemasTodosUsuarios();
    res.json(temas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuario,
  criarNovoUsuario,
  atualizarSenha,
  excluirUsuario,
  login,
  atualizarUsuario,
  atualizarEmail,
  entrarNaMesa,
  sairDaMesa,
  adicionarTema,
  removerTema,
  listarTemas,
  listarTemasUsuario,
  listarTemasDoUsuario,
  listarTemasTodosUsuarios,
};
