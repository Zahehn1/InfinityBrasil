import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { Link, useNavigate } from "react-router-dom";
import "../form/form.css";

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

  const validar = () => {
    const cpfValido = "000.000.000-00";
    const senhaValida = "admin";

    if (cpf === cpfValido && senha === senhaValida) {
      navigate("/adminPage");
    } else {
      navigate("/erro");
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
