const express = require("express");
const sql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3031;

app.use(cors());
app.use(express.json());

const config = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "infinitybrasil",
});

config.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    throw err;
  }
  console.log("Conexão ao banco de dados estabelecida com sucesso!");
});

app.get("/usuarios", (req, res) => {
  config.query("SELECT * FROM cadastro", (error, results) => {
    if (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.json(results);
    }
  });
});
//Pode realizar a alteracao do tipo de usuario
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { SuperUser } = req.body;

  const query = "UPDATE cadastro SET SuperUser = ? WHERE ID = ?";
  config.query(query, [SuperUser, id], (error, results) => {
    if (error) {
      console.error("Erro ao atualizar o tipo de usuário:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    console.log("Tipo de usuário atualizado com sucesso!");
    res
      .status(200)
      .json({ message: "Tipo de usuário atualizado com sucesso!" });
  });
});
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
});
//requisicao de login

app.post("/login", async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    config.query(
      "SELECT * FROM cadastro WHERE CPF = ? AND Senha = ?",
      [cpf, senha],
      async (err, results) => {
        if (err) {
          console.error("Erro ao buscar o usuário:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: "CPF ou senha incorretos" });
        }

        const user = results[0];

        // Verifica se é super usuário
        if (user.SuperUser === 1) {
          // Usuário é super usuário
          res
            .status(200)
            .json({ message: "Login realizado como super usuário" });
        } else {
          // Usuário é usuário normal
          res
            .status(200)
            .json({ message: "Login realizado como usuário normal" });
        }
      }
    );
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }

  //requisicao de registro
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

    if (!NomeCompleto)
      return res.status(400).json({ error: "Há campos vagos." });
    if (Senha !== confSENHA) {
      return res.status(400).json({ error: "As senhas não coincidem." });
    }
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
              res.status(201).json({
                message: "Usuário inserido com sucesso!",
                redirectTo: "/login",
              });
            }
          );
        }
      );
    } catch (error) {
      console.error("Erro ao buscar o CPF:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });
});
