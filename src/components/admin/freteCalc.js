import React, { useState } from "react";

const CalculadoraFrete = () => {
  const [distancia, setDistancia] = useState("");
  const [pesoProduto, setPesoProduto] = useState("");
  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [historicoFretes, setHistoricoFretes] = useState([]);

  const calcularValorFrete = (e) => {
    e.preventDefault();

    let fatorTipoVeiculo;
    let fatorPesoProduto;

    if (pesoProduto >= 300) {
      fatorPesoProduto = 3.5;
    } else if (pesoProduto >= 200) {
      fatorPesoProduto = 2.0;
    } else {
      fatorPesoProduto = 1.0;
    }

    switch (tipoVeiculo) {
      case "Caminhao":
        fatorTipoVeiculo = 1.2;
        break;
      case "furgao":
        fatorTipoVeiculo = 1.5;
        break;
      case "carreta":
        fatorTipoVeiculo = 2;
        break;
      default:
        fatorTipoVeiculo = "0";
        break;
    }

    const valorFreteBruto =
      distancia * pesoProduto * fatorPesoProduto * fatorTipoVeiculo;

    let taxa;
    if (distancia <= 100) {
      taxa = 0.05;
    } else if (distancia <= 200) {
      taxa = 0.07;
    } else if (distancia <= 500) {
      taxa = 0.09;
    } else {
      taxa = 0.1;
    }

    const valorFinalFrete = valorFreteBruto + valorFreteBruto * taxa;

    const valorRecebidoEntregador = valorFreteBruto - valorFreteBruto * taxa;

    const freteCalculado = {
      distancia: distancia,
      pesoProduto: pesoProduto,
      tipoVeiculo: tipoVeiculo,
      valorFrete: valorFinalFrete.toFixed(2),
      taxaAplicada: (taxa * 100).toFixed(2),
      valorRecebidoEntregador: valorRecebidoEntregador.toFixed(2),
    };

    setHistoricoFretes([...historicoFretes, freteCalculado]);

    setDistancia("");
    setPesoProduto("");
    setTipoVeiculo("");
  };

  const handleExcluirFrete = (index) => {
    const novoHistoricoFretes = [...historicoFretes];
    novoHistoricoFretes.splice(index, 1);
    setHistoricoFretes(novoHistoricoFretes);
  };

  return (
    <div>
      <form onSubmit={calcularValorFrete}>
        <h2>Calculadora de Frete</h2>
        <label>
          Distância (em km):
          <input
            type="number"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
          />
        </label>
        <br />
        <label>
          Peso do Produto (em kg):
          <input
            type="number"
            value={pesoProduto}
            onChange={(e) => setPesoProduto(e.target.value)}
          />
        </label>
        <br />
        <label>
          Tipo de Veículo:
          <select
            value={tipoVeiculo}
            onChange={(e) => setTipoVeiculo(e.target.value)}
          >
            <option value="">Selecione o tipo de veículo</option>
            <option value="Caminhao">Caminhao</option>
            <option value="Furgao">Furgao</option>
            <option value="Carreta">Carreta</option>
          </select>
        </label>
        <br />
        <button type="submit">Calcular Frete</button>
      </form>

      {historicoFretes.length > 0 && (
        <form onSubmit={handleExcluirFrete}>
          <div>
            <h2>Histórico de Fretes Calculados</h2>
            <ul>
              {historicoFretes.map((frete, index) => (
                <li key={index}>
                  <p>Distância: {frete.distancia} km</p>
                  <p>Peso do Produto: {frete.pesoProduto} kg</p>
                  <p>Tipo de Veículo: {frete.tipoVeiculo}</p>
                  <p>Valor do Frete: R$ {frete.valorFrete}</p>
                  <p>Taxa Aplicada: {frete.taxaAplicada}%</p>
                  <p>
                    Valor Recebido pelo Entregador: R${" "}
                    {frete.valorRecebidoEntregador}
                  </p>
                  <button onClick={() => handleExcluirFrete(index)}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      )}
    </div>
  );
};

export default CalculadoraFrete;
