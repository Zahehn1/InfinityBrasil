import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import "../adminPanel/formcarga.css";

export const UparCarga = () => {
  //states para atualizar os valos inseridos pelo user
  const [nomeCarga, setNomeCarga] = useState("");
  const [pesoCarga, setPesoCarga] = useState("");
  const [valorCarga, setValorCarga] = useState("");
  const [distanciaFrete, setDistanciaFrete] = useState("");
  const [descricaoCarga, setDescricaoCarga] = useState("");
  const [statusCarga, setStatusCarga] = useState("aguardando_motorista");
  const [cargas, setCargas] = useState([]);
  //handle para lidar com os valores
  const handleChangeCarga = (e) => {
    setNomeCarga(e.target.value);
  };

  const handlePesoCarga = (e) => {
    setPesoCarga(e.target.value);
  };

  const handleValorCarga = (e) => {
    setValorCarga(e.target.value);
  };

  const handleDistanciaFrete = (e) => {
    setDistanciaFrete(e.target.value);
  };
  const handleDescricaoCarga = (e) => {
    setDescricaoCarga(e.target.value);
  };
  //foi criado um padrao para ser inserido um pouco mais abaixo

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaCarga = {
      nome: nomeCarga,
      peso: pesoCarga,
      valor: valorCarga,
      distancia: distanciaFrete,
      descricao: descricaoCarga,
      status: statusCarga,
    };

    setCargas([...cargas, novaCarga]);
    //esvazia o form apos o envio da requisicao de uma nova carga
    setNomeCarga("");
    setPesoCarga("");
    setValorCarga("");
    setDescricaoCarga("");
  };
  //faz a validacao do estado da carga para que possa ser alterado entre entregue, etc
  const handleStatusChange = (novoStatus, index) => {
    if (novoStatus === "excluir") {
      const cargasAtualizadas = cargas.filter((carga, i) => i !== index);
      setCargas(cargasAtualizadas);
    } else {
      const cargasAtualizadas = [...cargas];
      cargasAtualizadas[index].status = novoStatus;
      setCargas(cargasAtualizadas);
    }
  };

  return (
    <>
      <div className="UparCargas">
        <container>
          <section>
            <form onSubmit={handleSubmit}>
              <legend>Preencha os dados da carga a ser colocada</legend>
              <label>Insira o nome da carga</label>
              <input
                type="text"
                value={nomeCarga}
                onChange={handleChangeCarga}
                required
              />
              <label>Insira o peso carga (KG)</label>
              <IMaskInput
                mask="KG 00000000000"
                type="text"
                value={pesoCarga}
                onChange={handlePesoCarga}
              />
              <label>Insira o valor da carga</label>
              <IMaskInput
                mask="R$ 000000000000"
                type="text"
                value={valorCarga}
                onChange={handleValorCarga}
                required
              />
              <label>Insira a km que a carga precisa percorrer (KM)</label>
              <input
                type="text"
                value={distanciaFrete}
                onChange={handleDistanciaFrete}
                required
              />
              <label>Insira a descricao da carga</label>
              <input
                type="text"
                value={descricaoCarga}
                onChange={handleDescricaoCarga}
                required
              />
              <button type="submit">Criar nova carga</button>
            </form>
          </section>
        </container>

        <section>
          <ul>
            {cargas.map((carga, index) => (
              <li key={index}>
                {carga.nome} - Peso: {carga.peso}, Valor: {carga.valor},
                Kilometragem:{carga.distancia}, Descrição: {carga.descricao},
                Status: {carga.status}
                <button
                  onClick={() => handleStatusChange("em andamento", index)}
                >
                  Em Andamento
                </button>
                <button onClick={() => handleStatusChange("entregue", index)}>
                  Entregue
                </button>
                <button
                  onClick={() =>
                    handleStatusChange("aguardando motorista", index)
                  }
                >
                  Aguardando Motorista
                </button>
                <button onClick={() => handleStatusChange("excluir", index)}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
