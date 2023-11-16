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

const validarAlteracaoUsuario = [
  body('nome')
    .notEmpty().withMessage('O nome é obrigatório')
    .custom((value) => /^[a-zA-Z\s]*$/.test(value)).withMessage('O nome não pode conter números')
    .isLength({ max: 22 }).withMessage('O nome não pode ter mais de 22 caracteres')
    .optional(),

  body('datanascimento')
    .optional()
    .isISO8601().withMessage('A data de nascimento deve ser uma data válida'),

  body('telefone')
    .optional()
    .matches(/^[0-9-]+$/).withMessage('O telefone deve conter apenas números e hífens'),

  body('descricao')
    .optional()
    .isLength({ max: 100 }).withMessage('A descrição não pode ter mais de 100 caracteres'),

  (req, res, next) => {
    
    const camposIndesejados = ['email', 'senha'];
    const corpoRequisicao = Object.keys(req.body);

    if (camposIndesejados.some((campo) => corpoRequisicao.includes(campo))) {
      return res.status(400).json({ error: 'Não é permitido alterar o email ou senha por este meio' });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

const validarAtualizacaoSenha = [
  body('senhaAntiga').notEmpty().withMessage('Senha antiga é obrigatória'),
  body('novaSenha')
    .isLength({ min: 6 }).withMessage('A nova senha deve ter pelo menos 6 caracteres')
    .custom((value, { req }) => {
      if (value === req.body.senhaAntiga) {
        throw new Error('A nova senha deve ser diferente da senha antiga');
      }
      return true;
    }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

  const validarLogin = [
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

  const validarCriacaoMesa = [
    body('titulo')
      .notEmpty().withMessage('O título é obrigatório')
      .isLength({ max: 20 }).withMessage('O título não pode ter mais de 30 caracteres'),
  
    body('subtitulo')
      .notEmpty().withMessage('O subtitulo é obrigatório')
      .isLength({ max: 30 }).withMessage('O subtitulo não pode ter mais de 50 caracteres'),
  
    body('sistema')
      .notEmpty().withMessage('O sistema é obrigatório')
      .isLength({ max: 30 }).withMessage('O sistema não pode ter mais de 30 caracteres'),
  
    body('descricao')
      .notEmpty().withMessage('A descrição é obrigatória')
      .isLength({ max: 100 }).withMessage('A descrição não pode ter mais de 100 caracteres'),
  
    body('data')
      .notEmpty().withMessage('A data é obrigatória'),
  
    body('horario')
      .notEmpty().withMessage('O horário é obrigatório')
      .isLength({ max: 10 }).withMessage('O horário não pode ter mais de 10 caracteres'),
  
    body('periodo')
      .notEmpty().withMessage('O período é obrigatório')
      .isLength({ max: 10 }).withMessage('O período não pode ter mais de 10 caracteres'),
  
    body('preco')
      .notEmpty().withMessage('O preço é obrigatório')
      .isNumeric().withMessage('O preço deve ser um número')
      .custom(value => value <= 10).withMessage('O preço não pode ser maior que 10'),
  
    body('vagas')
      .notEmpty().withMessage('O número de vagas é obrigatório')
      .isInt().withMessage('O número de vagas deve ser um número inteiro')
      .custom(value => value <= 15).withMessage('O número de vagas não pode ser maior que 15'),
  
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      next();
    },
  ];

  const validarEmail = [
    body('email')
      .notEmpty().withMessage('O e-mail é obrigatório')
      .isEmail().withMessage('E-mail inválido'),
  
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      next();
    },
  ];

module.exports = { validarNovoUsuario, validarAtualizacaoSenha, validarAlteracaoUsuario, validarLogin, validarCriacaoMesa, validarEmail  };
