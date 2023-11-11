const { body, validationResult } = require('express-validator');

const validarNovoUsuario = [
  body('nome').notEmpty().withMessage('O nome é obrigatório'),
  body('email').isEmail().withMessage('O email deve ser válido'),
  body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validarNovoUsuario };
