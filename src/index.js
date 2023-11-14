const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const UsuarioRoutes = require('./routes/UsuarioRoutes');
const MesaRoutes = require('./routes/MesaRoutes')

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(cookieParser());
app.use('/api', UsuarioRoutes);
app.use('/api', MesaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
