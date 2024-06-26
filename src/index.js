const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const UsuarioRoutes = require("./routes/UsuarioRoutes");
const MesaRoutes = require("./routes/MesaRoutes");
const ChatRoutes = require("./routes/ChatRoutes");
const UsuarioChatRoutes = require("./routes/UsuarioChatRoutes");
const UsuarioMesaRoutes = require("./routes/UsuarioMesaRoutes");
const MensagemRoutes = require("./routes/MensagemRoutes");
const PostRoutes = require("./routes/PostRoutes");
const AvaliacaoRoutes = require("./routes/AvaliacaoRoutes");
const MesaTemaRoutes = require("./routes/MesaTemaRoutes");
const TemaRoutes = require("./routes/TemaRoutes");

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8081", "exp://10.0.0.138:8081","exp://10.0.0.145:8081","https://beholder-fork-cs90k8ao7-pthumerianos-projects.vercel.app","https://beholder-fork.vercel.app"],
    credentials: true,
  }), 
);


app.use("/api", UsuarioRoutes);
app.use("/api", MesaRoutes);
app.use("/api", ChatRoutes);
app.use("/api/usuariochat", UsuarioChatRoutes);
app.use("/api/usuariomesa", UsuarioMesaRoutes);
app.use("/api/mensagens", MensagemRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/avaliacoes", AvaliacaoRoutes);
app.use("/api/mesatema", MesaTemaRoutes);
app.use("/api/temas", TemaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
