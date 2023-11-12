const UsuarioService = require('../services/UsuarioService');
const { validarLogin } = require('../middlewares/valiadacaoUsuarioMiddleware');


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

const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await UsuarioService.buscarUsuarioPorId(id);
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
    const { id, senhaAntiga, novaSenha } = req.body;

    // Chama o serviço para atualizar a senha
    const result = await UsuarioService.atualizarSenha(id, senhaAntiga, novaSenha);

    if (result.error) {
      throw new Error(`Erro ao atualizar a senha: ${result.error.message}`);
    }

    res.json({ mensagem: 'Senha atualizada com sucesso!', usuario: result.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const excluirUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Chama o serviço para excluir o usuário por ID
    const result = await UsuarioService.excluirUsuarioPorId(id);

    if (result.error) {
      throw new Error(`Erro ao excluir usuário: ${result.error.message}`);
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
  buscarUsuarioPorId,
  criarNovoUsuario,
  atualizarSenha,
  excluirUsuarioPorId,
  login
};
