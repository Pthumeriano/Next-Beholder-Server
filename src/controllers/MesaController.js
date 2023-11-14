/*
  A mesa tem um chat, precisa chamar a criação do chat na hora de criar a mesa e passar o id pro serviço da Mesa
*/
const MesaService = require('../services/MesaService');

const listarMesas = async (req, res) => {
    try {
        const {data, error} = await MesaService.listarMesas();

        if(error){
            throw new Error(`Erro ao listar mesas: ${error.message}`);
        }
        res.json(data)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const buscarMesa = async (req, res) => {
  try {
    const {data, error} = await MesaService.buscarMesa(req.body.id);

    if(error){
      throw new Error(`Erro ao buscar mesa: ${error.message}`)
    }
    res.json(data)

  } catch (error) {
    res.stats(500).json({error: error.message})
  }
}

const criarMesa = async (req, res) => {
    try {
      const { titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas } = req.body;
  
      const userId = req.cookies.BeholderToken;
  
      // Chama o serviço da mesa para criar a mesa, passando os detalhes da mesa
      const result = await MesaService.criarMesa(userId, titulo, subtitulo, sistema, descricao, data, horario, periodo, preco, vagas);
  
      if (result.error) {
        throw new Error(`Erro ao criar mesa: ${result.error}`);
      }
  
      res.json({ mensagem: 'Mesa criada com sucesso!', mesa: result.result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
    listarMesas,
    criarMesa,
    buscarMesa
}