/*
  A mesa tem um chat, precisa chamar a criação do chat na hora de criar a mesa e passar o id pro serviço da Mesa
*/

const MesaService = require("../services/MesaService");

const listarMesas = async (req, res) => {
  try {
    const { data, error } = await MesaService.listarMesas();

    if (error) {
      throw new Error(`Erro ao listar mesas: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarMesasDoMestre = async (req, res) => {
  try {
    const { data, error } = await MesaService.listarMesasDoMestre(
      req.usuarioAutenticado.userId
    );

    if (error) {
      throw new Error(`Erro ao listar mesas do mestre: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarMesa = async (req, res) => {
  try {
    const { data, error } = await MesaService.buscarMesa(req.params.id);

    if (error) {
      throw new Error(`Erro ao buscar mesa: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarMesaTitulo = async (req, res) => {
  try {
    const { data, error } = await MesaService.buscarMesaTtulo(
      req.params.titulo
    );

    if (error) {
      throw new Error(`Erro ao buscar mesa: ${error.message}`);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarMesa = async (req, res) => {
  try {
    const {
      titulo,
      subtitulo,
      sistema,
      descricao,
      dia,
      horario,
      periodo,
      preco,
      vagas,
    } = req.body;

    const mestre = req.usuarioAutenticado.userId;

    const result = await MesaService.criarMesa(
      mestre,
      titulo,
      subtitulo,
      sistema,
      descricao,
      dia,
      horario,
      periodo,
      preco,
      vagas
    );

    if (result.error) {
      throw new Error(`Erro ao criar mesa: ${result.error}`);
    }

    res.json({ mensagem: "Mesa criada com sucesso!", mesa: result.result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const excluirMesa = async (req, res) => {
  try {
    const result = await MesaService.excluirMesa(
      req.usuarioAutenticado.userId,
      req.body.id
    );

    if (result.error) {
      throw new Error(`Erro ao excluir mesa`);
    }

    res.json({ mensagem: "Mesa excluida com sucesso!", mesa: result.result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const alterarMesa = async (req, res) => {
  try {
    const { id: mesaId } = req.params;

    const mesa = await MesaService.buscarMesaMestre(
      req.usuarioAutenticado.userId,
      mesaId
    );

    if (!mesa || !mesa.data || mesa.data.length === 0) {
      throw new Error("Você não tem permissão para alterar essa mesa");
    }

    const mestre = mesa.data[0].mestre;

    const {
      titulo,
      subtitulo,
      sistema,
      descricao,
      dia,
      horario,
      periodo,
      preco,
      vagas,
    } = req.body;

    await MesaService.alterarMesa(mestre, mesaId, {
      titulo,
      subtitulo,
      sistema,
      descricao,
      dia,
      horario,
      periodo,
      preco,
      vagas,
    });

    res.json({ mensagem: "Mesa alterada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarMesas,
  criarMesa,
  buscarMesa,
  excluirMesa,
  alterarMesa,
  buscarMesaTitulo,
  listarMesasDoMestre,
};
