const jwt = require('jsonwebtoken');

const autenticarMiddleware = (req, res, next) => {
  const token = req.cookies.BeholderToken;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Verificar se o token expirou
    if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
      return res.status(401).json({ error: 'Token expirado' });
    }
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // O token está expirado
      return res.status(401).json({ error: 'Token expirado' });
    } else {
      // Outro erro ao verificar o token
      return res.status(401).json({ error: 'Erro ao verificar o token' });
    }
  }
};

module.exports = autenticarMiddleware;
