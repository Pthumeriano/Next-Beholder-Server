const jwt = require('jsonwebtoken');

const UsuarioModel = require('../models/UsuarioModel');

const autenticarMiddleware = async (req, res, next) => {
  const token = req.cookies.BeholderToken;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await UsuarioModel.buscarUsuario(decoded.userId);

    if (!usuario.data || usuario.data.length === 0) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    req.usuarioAutenticado = {
      userId: decoded.userId,
      email: usuario.data[0].email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = autenticarMiddleware;
