const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { connect } = require("mssql");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const PORT = 3031;

// Carregar o arquivo de documentação YAML
const swaggerDocument = YAML.load("./swagger.json");

// Rota para a documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());

const config = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Insira sua senha do MySQL aqui
  database: "infinitybrasil",
});

config.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    throw err;
  }
  console.log("Conexão ao banco de dados estabelecida com sucesso!");
});
// Endpoint para atualizar o status da carga
app.put("/cargas/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Verifica se o usuário autenticado é um super usuário
  const isAdmin = req.userType === "superuser";

  if (!isAdmin) {
    return res.status(403).json({
      error: "Apenas administradores podem atualizar o status da carga",
    });
  }

  const query = "UPDATE cargas SET status = ? WHERE id = ?";
  config.query(query, [status, id], (error, results) => {
    if (error) {
      console.error("Erro ao atualizar o status da carga:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    console.log("Status da carga atualizado com sucesso!");
    res
      .status(200)
      .json({ message: "Status da carga atualizado com sucesso!" });
  });
});
app.post("/alterar-status-carga/:cargaId", (req, res) => {
  const cargaId = req.params.cargaId;
  const novoStatus = req.body.status;

  // Atualize o status da carga no banco de dados
  const query = "UPDATE cargas SET status = ? WHERE id = ?";
  connect.query(query, [novoStatus, cargaId], (err, results) => {
    if (err) {
      console.error("Erro ao alterar o status da carga:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    console.log("Status da carga atualizado com sucesso!");
    res
      .status(200)
      .json({ message: "Status da carga atualizado com sucesso!" });
  });
});
app.post("/adicionar-carga", (req, res) => {
  const { nome, peso, valor, distancia, descricao, status } = req.body;

  // Verifica se o status foi fornecido no corpo da solicitação
  const cargaStatus = status ? status : "Pendente"; // Valor padrão é "Pendente" se o status não for fornecido

  const query =
    "INSERT INTO cargas (nome, peso, valor, distancia, descricao, status) VALUES (?, ?, ?, ?, ?, ?)";

  config.query(
    query,
    [nome, peso, valor, distancia, descricao, cargaStatus], // Use cargaStatus em vez de status
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir carga:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      console.log("Carga inserida com sucesso!");
      res.status(201).json({
        message: "Carga inserida com sucesso!",
      });
    }
  );
});
// Rota para obter todas as cargas do banco de dados
app.get("/cargas", (req, res) => {
  const query = "SELECT * FROM cargas";

  config.query(query, (error, results) => {
    if (error) {
      console.error("Erro ao buscar cargas:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(results);
  });
});

// Endpoint para login
app.post("/login", async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const query = "SELECT * FROM cadastro WHERE CPF = ? AND Senha = ?";
    config.query(query, [cpf, senha], async (err, results) => {
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
        res.status(200).json({ userType: "superuser" });
      } else {
        // Usuário é usuário normal
        res.status(200).json({ userType: "normaluser" });
      }
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/veiculos", (req, res) => {
  const query = "SELECT * FROM veiculos";

  config.query(query, (error, results) => {
    if (error) {
      console.error("Erro ao buscar veículos:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(results);
  });
});
// Endpoint para obter todos os usuários com seus veículos
app.get("/cadastro", (req, res) => {
  const query = "SELECT NomeCompleto FROM cadastro";

  config.query(query, (error, results) => {
    if (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(results);
  });
});

// atualizar o tipo de usuário
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { SuperUser } = req.body;

  const query = "UPDATE usuarios SET SuperUser = ? WHERE ID = ?";
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

// Endpoint para cadastrar um novo usuário
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
  if (Senha !== confSENHA) {
    return res.status(400).json({ error: "As senhas não coincidem." });
  }

  try {
    console.log("Recebendo solicitação de registro...");
    const checkUsersQuery = "SELECT * FROM cadastro";
    config.query(checkUsersQuery, async (err, results) => {
      if (err) {
        console.error("Erro ao verificar usuários:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      // Se não houver nenhum usuário cadastrado, o primeiro usuário será um super usuário
      const isSuperUser = results.length === 0;

      const query =
        "INSERT INTO cadastro (NomeCompleto, Email, CPF, DataNascimento, NumeroCNH, LocalExpedicaoCNH, Endereco, Complemento, CEP, Genero, TipoVeiculo, PlacaVeiculo, MarcaVeiculo, ModeloVeiculo, AnoVeiculo, Senha, confSENHA, SuperUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
          isSuperUser ? 1 : 0, // Define SuperUser como 1 se for o primeiro usuário, caso contrário, define como 0
        ],
        (err, results) => {
          if (err) {
            console.error("Erro ao inserir usuário:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
          console.log("Usuário inserido com sucesso!");
          res.status(201).json({
            message: "Usuário inserido com sucesso!",
            redirectTo: "/login",
          });
        }
      );
    });
  } catch (error) {
    console.error("Erro ao processar a solicitação de registro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
});
