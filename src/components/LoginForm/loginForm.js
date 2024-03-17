import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";

export const LoginForm = () => {
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleChangeCPF = (e) => {
    setCPF(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const validar = async () => {
    try {
      const response = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, senha }),
      });

      if (response.status === 200) {
        navigate("/050900");
      } else if (response.status === 401) {
        alert("CPF ou senha incorretos");
      } else {
        alert("Erro ao realizar o login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login");
    }
  };

  return (
    <>
      <section className="container">
        <form>
          <h2>LOGIN</h2>
          <label>Insira seu CPF </label>
          <IMaskInput
            mask="000.000.000-00"
            placeholder="CPF..."
            value={cpf}
            onChange={handleChangeCPF}
            required
          />
          <label>Insira sua senha </label>
          <input
            type="password"
            placeholder="Senha..."
            value={senha}
            onChange={handleChangeSenha}
          />
          <button type="button" onClick={validar}>
            Enviar
          </button>
          <Link to="/Registro" /*isso ainda e considerado um "a" no css*/>
            Não possui cadastro? Clique aqui
          </Link>
        </form>
      </section>
    </>
  );
};
