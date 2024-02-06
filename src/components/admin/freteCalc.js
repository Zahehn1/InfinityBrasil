import React, { useState } from "react";

const CalculadoraFrete = () => {
  const [distancia, setDistancia] = useState("");
  const [pesoProduto, setPesoProduto] = useState("");
  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [valorFrete, setValorFrete] = useState(null);
  const [taxa, setTaxa] = useState(null);

  const calcularValorFrete = () => {
    // Lógica para calcular o valor do frete com base no tipo de veículo
    let fatorTipoVeiculo;

    switch (tipoVeiculo) {
      case "Bi-trem":
        fatorTipoVeiculo = 1.2;
        break;
      case "Munk":
        fatorTipoVeiculo = 1.5;
        break;
      case "caminhao":
        fatorTipoVeiculo = 2;
        break;
      default:
        fatorTipoVeiculo = 1;
    }

    const valorFreteBruto = distancia * (pesoProduto / 100) * fatorTipoVeiculo;

    // Lógica para aplicar a taxa com base na distância
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

    // Calcula o valor final do frete (frete bruto - taxa)
    const valorFinalFrete = valorFreteBruto - valorFreteBruto * taxa;

    setValorFrete(valorFinalFrete.toFixed(2)); // Arredonda para duas casas decimais
    setTaxa((taxa * 100).toFixed(2)); // Arredonda para duas casas decimais e converte para porcentagem
  };

  return (
    <div>
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
          <option value="Bi-trem">Bi-trem</option>
          <option value="Munk">Munk</option>
          <option value="caminhao">Caminhão</option>
        </select>
      </label>
      <br />
      <button onClick={calcularValorFrete}>Calcular Frete</button>
      <br />
      {valorFrete !== null && (
        <div>
          <h3>Valor do Frete: R$ {valorFrete}</h3>
          <h3>Taxa Aplicada: {taxa}%</h3>
        </div>
      )}
    </div>
  );
};

export default CalculadoraFrete;
