const express = require('express');
const usuarioRoutes = require('./routes/UsuarioRoutes');

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use('/api', usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
