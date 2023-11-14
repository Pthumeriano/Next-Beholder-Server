const jwt = require('jsonwebtoken');

const autenticarMiddleware = (req, res, next) => {
  const token = req.cookies.BeholderToken;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    // Verificar e decodificar o token JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.usuarioAutenticado = decoded.userId; // Adiciona o ID do usuário à requisição
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = autenticarMiddleware;