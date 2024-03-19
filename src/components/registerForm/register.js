import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMaskInput } from "react-imask";
import "./register.css";
import { NavBar } from "../navbar/navbar";
import { Link } from "react-router-dom";

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NomeCompleto: "",
      Email: "",
      CPF: "",
      DataNascimento: "",
      NumeroCNH: "",
      LocalExpedicaoCNH: "",
      Endereco: "",
      Complemento: "",
      CEP: "",
      Genero: "", // Alterado para uma string vazia para evitar problemas
      TipoVeiculo: "",
      PlacaVeiculo: "",
      MarcaVeiculo: "",
      ModeloVeiculo: "",
      AnoVeiculo: "",
      Senha: "",
      confSENHA: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRadioChange = (e) => {
    this.setState({
      Genero: e.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      NomeCompleto: this.state.NomeCompleto,
      Email: this.state.Email,
      CPF: this.state.CPF,
      DataNascimento: this.state.DataNascimento,
      NumeroCNH: this.state.NumeroCNH,
      LocalExpedicaoCNH: this.state.LocalExpedicaoCNH,
      Endereco: this.state.Endereco,
      Complemento: this.state.Complemento,
      CEP: this.state.CEP,
      Genero: this.state.Genero,
      TipoVeiculo: this.state.TipoVeiculo,
      PlacaVeiculo: this.state.PlacaVeiculo,
      MarcaVeiculo: this.state.MarcaVeiculo,
      ModeloVeiculo: this.state.ModeloVeiculo,
      AnoVeiculo: this.state.AnoVeiculo,
      Senha: this.state.Senha,
      confSENHA: this.state.confSENHA,
    };

    try {
      const response = await fetch("http://localhost:3031/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        toast("Usuario Cadastrado", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Erro no servidor, tente novamente mais tarde");
      } else if (error.response && error.response.status === 400) {
        console.log("CPF já cadastrado");
      } else {
        alert("Erro desconhecido: " + error.message);
      }
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="REGISTERFORM">
          <section className="SectionForm">
            <form className="FormRegister" onSubmit={this.handleSubmit}>
              <legend>Formulário de registro</legend>
              <legend>Dados do condutor</legend>
              <label htmlFor="NomeCompleto">Nome Completo*</label>
              <input
                type="text"
                id="NomeCompleto"
                name="NomeCompleto"
                placeholder="Nome..."
                required
                value={this.state.NomeCompleto}
                onChange={this.handleChange}
              />
              <label htmlFor="Email">Email*</label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="email..."
                required
                value={this.state.Email}
                onChange={this.handleChange}
              />
              <label>CPF*</label>
              <IMaskInput
                mask="000.000.000-00"
                placeholder="CPF..."
                required
                name="CPF"
                value={this.state.CPF}
                onChange={this.handleChange}
              />
              <label>Data de nascimento*</label>
              <input
                type="date"
                required
                name="DataNascimento"
                placeholder="Data de nascimento..."
                value={this.state.DataNascimento}
                onChange={this.handleChange}
              />
              <label>Qual o número da sua CNH</label>
              <input
                type="text"
                name="NumeroCNH"
                placeholder="Digite o número da sua CNH"
                value={this.state.NumeroCNH}
                onChange={this.handleChange}
              />
              <label>Local de expedição CNH</label>
              <input
                type="text"
                maxLength={5}
                name="LocalExpedicaoCNH"
                value={this.state.LocalDeExpCNH}
                onChange={this.handleChange}
              />
              <label>Foto da CNH</label>
              <input type="file" />
              <label>Endereço*</label>
              <input
                type="text"
                name="Endereco"
                placeholder="Endereço..."
                value={this.state.Endereco}
                onChange={this.handleChange}
              />
              <label htmlFor="Complemento">Complemento</label>
              <input
                placeholder="Complemento"
                id="Complemento"
                type="Text"
                name="Complemento"
                value={this.state.Complemento}
                maxLength={9}
                onChange={this.handleChange}
              />
              <label>CEP</label>
              <input
                type="text"
                name="CEP"
                placeholder="CEP..."
                value={this.state.CEP}
                maxLength={9}
                onChange={this.handleChange}
              />
              <div>
                <legend>Gênero*</legend>
                <label htmlFor="masculino">Masculino</label>
                <input
                  type="radio"
                  id="masculino"
                  name="Genero"
                  value="Masculino"
                  onChange={this.handleRadioChange}
                />
                <label htmlFor="feminino">Feminino</label>
                <input
                  type="radio"
                  id="feminino"
                  name="Genero"
                  value="Feminino"
                  onChange={this.handleRadioChange}
                />
                <label htmlFor="outro">Outro</label>
                <input
                  type="radio"
                  id="outro"
                  name="Genero"
                  value="Outro"
                  onChange={this.handleRadioChange}
                />
              </div>
              <legend>Tipo de veículo*</legend>
              <label htmlFor="Carreta">Carreta</label>
              <input
                type="radio"
                id="Carreta"
                name="TipoVeiculo"
                value="Carreta"
                onChange={this.handleChange}
              />
              <label htmlFor="Caminhao">Caminhão</label>
              <input
                type="radio"
                id="Caminhao"
                name="TipoVeiculo"
                value="Caminhão"
                onChange={this.handleChange}
              />
              <label htmlFor="Furgao">Furgão</label>
              <input
                type="radio"
                id="Furgao"
                name="TipoVeiculo"
                value="Furgão"
                onChange={this.handleChange}
              />
              <legend>Dados do veículo</legend>
              <label htmlFor="fotoDocumento">
                Insira uma foto do documento do veículo
              </label>
              <input
                type="file"
                name="FotoDocVei"
                value={this.state.FotoDocVei}
                onChange={this.handleChange}
              />
              <label>Insira a placa do veículo</label>
              <input
                type="text"
                name="PlacaVeiculo"
                placeholder="Insira a placa do veículo"
                value={this.state.PlacaVeiculo}
                onChange={this.handleChange}
              />
              <label htmlFor="MarcaVei">Marca do veículo</label>
              <input
                type="text"
                id="MarcaVei"
                name="MarcaVeiculo"
                placeholder="Insira a marca"
                value={this.state.MarcaVeiculo}
                onChange={this.handleChange}
              />
              <label>Modelo do veículo</label>
              <input
                type="text"
                name="ModeloVeiculo"
                placeholder="Insira o modelo"
                value={this.state.ModeloVeiculo}
                onChange={this.handleChange}
              />
              <label>Ano do veículo</label>
              <input
                type="number"
                name="AnoVeiculo"
                placeholder="Insira o ano"
                value={this.state.AnoVeiculo}
                onChange={this.handleChange}
              />
              <label>Crie sua senha*</label>
              <input
                type="password"
                required
                maxLength={18}
                alt="Local de inserir senha"
                name="Senha"
                value={this.state.Senha}
                onChange={this.handleChange}
              />
              <label>Confirme sua senha*</label>
              <input
                type="password"
                required
                maxLength={18}
                alt="Local de inserir senha"
                name="confSENHA"
                value={this.state.confSENHA}
                onChange={this.handleChange}
              />
              <button type="submit">Fazer registro</button>
              <Link to="/Login">Já possui cadastro? Faça login aqui</Link>
            </form>
          </section>
        </div>
      </>
    );
  }
}
