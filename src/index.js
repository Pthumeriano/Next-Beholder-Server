const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const UsuarioRoutes = require('./routes/UsuarioRoutes');
const MesaRoutes = require('./routes/MesaRoutes');
const ChatRoutes = require('./routes/ChatRoutes');
const UsuarioChatRoutes = require('./routes/UsuarioChatRoutes');
const UsuarioMesaRoutes = require('./routes/UsuarioMesaRoutes');
const MensagemRoutes = require('./routes/MensagemRoutes');

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(cookieParser());
app.use('/api', UsuarioRoutes);
app.use('/api', MesaRoutes);
app.use('/api', ChatRoutes);
app.use('/api/usuariochat', UsuarioChatRoutes);
app.use('/api/usuariomesa', UsuarioMesaRoutes);
app.use('/api/mensagens', MensagemRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
