const { body, validationResult } = require('express-validator');

function clean(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === "") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      clean(obj[key]); // Recursive cleaning for nested objects
    }
  }
}

const validarNovoUsuario = [
  body('nome')
    .notEmpty().withMessage('O nome é obrigatório')
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error('O nome não pode conter números');
      }
      return true;
    }),
  body('email').isEmail().withMessage('O email deve ser válido'),
  body('senha')
    .isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula')
    .matches(/\d/).withMessage('A senha deve conter pelo menos um número')
    .matches(/[!@#$%^&*]/).withMessage('A senha deve conter pelo menos um caractere especial (!@#$%^&*)'),
    body('datanascimento')
    .optional()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Formato de data inválido. Exemplo: 01/01/1991')
    .custom((value) => {
      const [day, month, year] = value.split('/').map(Number);
      const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day);
      return isValidDate;
    }).withMessage('Data de nascimento inválida'),

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
    .isLength({ min: 8 }).withMessage('A nova senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('A nova senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/).withMessage('A nova senha deve conter pelo menos uma letra minúscula')
    .matches(/\d/).withMessage('A nova senha deve conter pelo menos um número')
    .matches(/[!@#$%^&*]/).withMessage('A nova senha deve conter pelo menos um caractere especial (!@#$%^&*)')
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
  
  body('dia')
    .notEmpty().withMessage('O dia é obrigatório'),
  
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

const validarAlteracaoMesa = [

  body('titulo').isLength({ max: 50 }).withMessage('O título não pode ter mais de 50 caracteres'),
  body('subtitulo').isLength({ max: 100 }).withMessage('O subtítulo não pode ter mais de 100 caracteres'),
  body('dia').isLength({ max: 20 }).withMessage('Como você fez isso?'),
  body('horario').isLength({ max: 20 }).withMessage('Como você fez isso?'),
  body('periodo').isLength({ max: 20 }).withMessage('Como você fez isso?'),
  body('descricao').isLength({ max: 255 }).withMessage('A descrição não pode ter mais de 255 caracteres'),
  body('sistema').isLength({ max: 20 }).withMessage('O sistema não pode ter mais de 50 caracteres'),

 
  body('preco').custom((value, { req }) => {
    if (req.method === 'PUT' && req.body.preco !== undefined) {
      return Promise.reject('O preço não pode ser alterado');
    }
    return true;
  }),
  body('vagas').custom((value, { req }) => {
    if (req.method === 'PUT' && req.body.vagas !== undefined) {
      return Promise.reject('O número de vagas não pode ser alterado');
    }
    return true;
  }),

  (req, res, next) => {
    clean(req.body);

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

module.exports = { validarNovoUsuario, validarAtualizacaoSenha, validarAlteracaoUsuario, validarLogin, validarCriacaoMesa, validarAlteracaoMesa, validarEmail };
