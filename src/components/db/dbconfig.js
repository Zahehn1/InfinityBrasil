// Importar os módulos necessários
const express = require("express");
const sql = require("mysql");
const cors = require("cors");

// Configurar o Express
const app = express();
const PORT = 3030;
app.use(cors());
app.use(express.json());

// Configurar a conexão com o SQL Server
const config = sql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `infinitybrasil`,
});

// Rota para criar um novo usuário
app.use(express.json());

config.connect(async (err) => {
  if (err) {
    console.log("Deu erro patrao");
    throw err;
  }
  console.log(`Conexao feite meu parceiro`);
  app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`);
  });
});

app.post("/registro", async (req, res) => {
  const {
    NomeCompleto,
    Email,
    CPF,
    DataNascimento,
    NumeroCNH,
    LocalExpedicaoCNH,
    Endereco,
    Complemento,
    CEP,
    Genero,
    TipoVeiculo,
    PlacaVeiculo,
    MarcaVeiculo,
    ModeloVeiculo,
    AnoVeiculo,
    Senha,
    confSENHA,
  } = req.body;

  if (!NomeCompleto) return res.status(400).json({ error: "Há campos vagos." });

  try {
    config.query(
      "SELECT CPF FROM cadastro WHERE CPF = ?",
      [CPF],
      async (err, results) => {
        if (err) {
          console.error("Erro ao buscar o CPF:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length > 0)
          return res.status(400).json({ error: "CPF já cadastrado" });

        const query =
          "INSERT INTO cadastro (NomeCompleto, Email, CPF, DataNascimento, NumeroCNH, LocalExpedicaoCNH, Endereco, Complemento, CEP, Genero, TipoVeiculo, PlacaVeiculo, MarcaVeiculo, ModeloVeiculo, AnoVeiculo, Senha, confSENHA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        config.query(
          query,
          [
            NomeCompleto,
            Email,
            CPF,
            DataNascimento,
            NumeroCNH,
            LocalExpedicaoCNH,
            Endereco,
            Complemento,
            CEP,
            Genero,
            TipoVeiculo,
            PlacaVeiculo,
            MarcaVeiculo,
            ModeloVeiculo,
            AnoVeiculo,
            Senha,
            confSENHA,
          ],
          (err, results) => {
            if (err) {
              console.error("Erro ao inserir usuário:", err);
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }
            console.log("Usuário inserido com sucesso!");
            res.status(201).json({ message: "Usuário inserido com sucesso!" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Erro ao buscar o CPF:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
