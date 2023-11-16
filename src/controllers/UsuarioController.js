const UsuarioService = require('../services/UsuarioService');

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
    const { data, error } = await UsuarioService.buscarUsuario(req.body.id);
    if (error) {
      throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
    }

    if (!data) {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarNovoUsuario = async (req, res) => {
  try {
    const { data, error } = await UsuarioService.criarNovoUsuario(req.body);

    if (error) {
      throw new Error(`Erro ao criar novo usuário: ${error.message}`);
    }

    res.json({ mensagem: 'Novo usuário criado com sucesso!', usuario: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarSenha = async (req, res) => {
  try {
    const { senhaAntiga, novaSenha } = req.body;

    // Chama o serviço para atualizar a senha
    const result = await UsuarioService.atualizarSenha(senhaAntiga, novaSenha, req.cookies.BeholderToken);

    if (result.error) {
      throw new Error(`Erro ao atualizar a senha: ${result.error}`);
    }

    res.json({ mensagem: 'Senha atualizada com sucesso!', usuario: result.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const excluirUsuario = async (req, res) => {
  try {

    const { senha } = req.body;
    const result = await UsuarioService.excluirUsuario(req.usuarioAutenticado, senha);

    if (result.error) {
      throw new Error(`Erro ao excluir usuário: ${result.error}`);
    }

    res.json({ mensagem: 'Usuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  const result = await UsuarioService.login(email, senha, res);

  if (result.error) {
    res.status(401).json({ error: result.error });
  } else {
    res.json(result);
  }
};



module.exports = {
  listarUsuarios,
  buscarUsuario,
  criarNovoUsuario,
  atualizarSenha,
  excluirUsuario,
  login
};
