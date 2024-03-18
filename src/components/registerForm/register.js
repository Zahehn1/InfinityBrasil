import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMaskInput } from "react-imask";
import "./register.css";
import { NavBar } from "../navbar/navbar";
import { Link, Navigate } from "react-router-dom";

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
      Genero: "",
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
      Complemento: this.state.Complemento, // Adicionei a propriedade Complemento
      CEP: this.state.CEP,
      Genero: this.state.Genero, // Adicionei a propriedade Genero
      TipoVeiculo: this.state.TipoVeiculo, // Adicionei a propriedade TipoVeiculo
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
              <legend>Formulario de registro</legend>
              <legend>Dados do condutor </legend>
              <label htmlFor="NomeCompleto"> Nome Completo*</label>
              <input
                type="text"
                id="NomeCompleto"
                placeholder="Nome..."
                required
                value={this.state.NomeCompleto}
                onChange={(e) =>
                  this.setState({ NomeCompleto: e.target.value })
                }
              />
              <label htmlFor="Email"> Email*</label>
              <input
                type="email"
                id="Email"
                placeholder="email..."
                required
                value={this.state.Email}
                onChange={(e) => this.setState({ Email: e.target.value })}
              />
              <label> CPF*</label>
              <IMaskInput
                mask="000.000.000-00"
                placeholder="CPF..."
                required
                value={this.state.CPF}
                onChange={(e) => this.setState({ CPF: e.target.value })}
              />
              <label>Data de nascimento*</label>
              <input
                type="date"
                required
                placeholder="Data de nascimento..."
                value={this.state.DataNascimento}
                onChange={(e) =>
                  this.setState({ DataNascimento: e.target.value })
                }
              />
              <label>Qual o numero da sua CNH</label>
              <input
                type="text"
                placeholder="Digite o numero da sua CNH"
                value={this.state.NumeroCNH}
                onChange={(e) => this.setState({ NumeroCNH: e.target.value })}
              />
              <label>Local de expedicao CNH</label>
              <input
                type="text"
                maxLength={5}
                value={this.state.LocalDeExpCNH}
                onChange={(e) =>
                  this.setState({ LocalDeExpCNH: e.target.value })
                }
              />
              <label>Foto da CNH</label>
              <input type="file" />
              <label> Endereco*</label>
              <input
                type="text"
                placeholder="Endereço..."
                value={this.state.Endereco}
                onChange={(e) => this.setState({ Endereco: e.target.value })}
              />
              <label for="Complemento">Complemento</label>
              <input
                placeholder="Complemento"
                id="Complemento"
                type="Text"
                value={this.state.Complemento}
                maxLength={9}
                onChange={(e) => this.setState({ Complemento: e.target.value })}
              />
              <label> CEP</label>
              <input
                type="text"
                placeholder="CEP..."
                value={this.state.CEP}
                maxLength={9}
                onChange={(e) => this.setState({ CEP: e.target.value })}
              />
              <div>
                <legend> Genero*:</legend>

                <label id="masculino" for="masculino">
                  Masculino
                </label>
                <input
                  type="radio"
                  id="masculino"
                  name="genero"
                  value={this.state.Genero}
                  onChange={(e) => this.setState({ Genero: e.target.value })}
                />
                <label id="feminino" for="feminino">
                  Feminino
                </label>
                <input
                  type="radio"
                  id="feminino"
                  name="genero"
                  value={this.state.Genero}
                  onChange={(e) => this.setState({ Genero: e.target.value })}
                />

                <label id="N/S" for="prefiro nao dizer">
                  Outros
                </label>
                <input
                  type="radio"
                  id="N/S"
                  name="genero"
                  value={this.state.Genero}
                  onChange={(e) => this.setState({ Genero: e.target.value })}
                />
              </div>
              <legend>Tipo de veiculo*</legend>
              <label id="Pickup" for="Pickup">
                Carreta
              </label>
              <input
                type="radio"
                id="Pickup"
                name="tipoVeiculo"
                value={this.state.TipoVeiculo}
                onChange={(e) => this.setState({ TipoVeiculo: e.target.value })}
              />
              <label id="Carreta" for="Carreta">
                Caminhao
              </label>
              <input
                type="radio"
                id="Carreta"
                name="tipoVeiculo"
                value={this.state.TipoVeiculo}
                onChange={(e) => this.setState({ TipoVeiculo: e.target.value })}
              />
              <label id="Caminhao" for="Caminhao">
                Furgao
              </label>
              <input
                type="radio"
                id="Caminhao"
                name="tipoVeiculo"
                value={this.state.TipoVeiculo}
                onChange={(e) => this.setState({ TipoVeiculo: e.target.value })}
              />
              <legend>Dados do veículo</legend>
              <label htmlFor="Foto do documento do veiculo">
                Insira uma foto do documento do veiculo
              </label>
              <input
                type="file"
                value={this.state.FotoDocVei}
                onChange={(e) => this.setState({ FotoDocVei: e.target.value })}
              />
              <label>Insira a placa do veiculo</label>
              <input
                type="text"
                placeholder="Insira a placa do veiculo"
                value={this.state.PlacaVei}
                onChange={(e) => this.setState({ PlacaVei: e.target.value })}
              />
              <label htmlFor="MarcaVei">Marca do veiculo</label>
              <input
                type="text"
                id="MarcaVei"
                placeholder="Insira a marca"
                value={this.state.Marca}
                onChange={(e) => this.setState({ Marca: e.target.value })}
              />
              <label>Modelo do veiculo</label>
              <input
                type="text"
                placeholder="Insira o modelo"
                value={this.state.ModeloVei}
                onChange={(e) => this.setState({ ModeloVei: e.target.value })}
              />
              <label>Ano do veiculo</label>
              <input
                type="NUMBER "
                placeholder="Insira o ano"
                value={this.state.AnoVei}
                onChange={(e) => this.setState({ AnoVei: e.target.value })}
              />
              <label>Crie sua senha*</label>
              <input
                type="password"
                required
                maxLength={18}
                alt="Local de inserir senha"
                value={this.state.Senha}
                onChange={(e) => this.setState({ Senha: e.target.value })}
              />
              <label>Confirme sua senha*</label>
              <input
                type="password"
                required
                maxLength={18}
                alt="Local de inserir senha"
                value={this.state.confSENHA}
                onChange={(e) => this.setState({ confSENHA: e.target.value })}
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
