import { Component } from "react";
import { IMaskInput } from "react-imask";
import "./register.css";
import { NavBar } from "../navbar/navbar";

export class RegisterForm extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="REGISTERFORM">
          <section className="SectionForm">
            <form className="FormRegister">
              <legend>Formulario de registro</legend>

              <legend>Dados do condutor </legend>
              <label htmlFor="NomeCompleto"> Nome Completo*</label>
              <input
                type="text"
                id="NomeCompleto"
                placeholder="Nome..."
                required
              />
              <label htmlFor="Email"> Email*</label>
              <input type="email" id="Email" placeholder="email..." required />
              <label> CPF*</label>
              <IMaskInput mask="000.000.000-00" placeholder="CPF..." required />
              <label>Data de nascimento*</label>
              <input type="date" required placeholder="Data de nascimento..." />
              <label>Qual o numero da sua CNH</label>
              <input type="text" placeholder="Digite o numero da sua CNH" />
              <label>Local de expedicao CNH</label>
              <input type="text" />
              <label>Foto da CNH</label>
              <input type="file" />
              <label> Endereco*</label>
              <input type="text" placeholder="Endereço..." />
              <label for="complemento">Complemento</label>
              <input placeholder="Complemento" id="complemento" type="Text" />
              <label> CEP</label>
              <input type="text" placeholder="CEP..." />

              <div>
                <legend> Genero*:</legend>

                <label id="masculino" for="masculino">
                  Masculino
                </label>
                <input
                  type="radio"
                  id="masculino"
                  name="genero"
                  value={"masculino"}
                />
                <label id="feminino" for="feminino">
                  Feminino
                </label>
                <input
                  type="radio"
                  id="feminino"
                  name="genero"
                  value={"feminino"}
                />

                <label id="N/S" for="prefiro nao dizer">
                  Outros
                </label>
                <input type="radio" id="N/S" name="genero" value={"N/S"} />
              </div>

              <legend>Tipo de veiculo*</legend>
              <label id="Pickup" for="Pickup">
                Picape
              </label>
              <input
                type="radio"
                id="Pickup"
                name="tipoVeiculo"
                value={"Picape"}
              />

              <label id="Carreta" for="Carreta">
                Carreta
              </label>

              <input
                type="radio"
                id="Carreta"
                name="tipoVeiculo"
                value={"Carreta"}
              />
              <label id="Caminhao" for="Caminhao">
                Caminhao
              </label>
              <input
                type="radio"
                id="Caminhao"
                name="tipoVeiculo"
                value={"Caminhao"}
              />

              <legend>Dados do veículo</legend>
              <label htmlFor="Foto do documento do veiculo">
                Insira uma foto do documento do veiculo
              </label>
              <input
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                alt="imagem sobre DOC veiculo"
              />
              <label>Insira a placa do veiculo</label>
              <input type="text" placeholder="Insira a placa do veiculo" />
              <label htmlFor="MarcaVei">Marca do veiculo</label>
              <input type="text" id="MarcaVei" placeholder="Insira a marca" />
              <label>Modelo do veiculo</label>
              <input type="text" placeholder="Insira o modelo" />
              <label>Ano do veiculo</label>
              <input type="NUMBER " placeholder="Insira o ano" />

              <label>Crie sua senha*</label>
              <input
                type="password"
                required
                maxLength={18}
                alt="Local de inserir senha"
              />
              <label>Confirme sua senha*</label>
              <input
                type="password"
                required
                maxLength={18}
                alt="Local de inserir senha"
              />

              <button type="submit">Fazer registro</button>
            </form>
          </section>
        </div>
      </>
    );
  }
}
