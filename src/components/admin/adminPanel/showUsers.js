import React, { useState, useEffect } from "react";
import axios from "axios";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3031/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <form>
        <h2>Lista de Usuários</h2>
        {usuarios.map((usuario) => (
          <div key={usuario.ID}>
            <h3>{usuario.NomeCompleto}</h3>
            <p>Email: {usuario.Email}</p>
            <h4>Veículos:</h4>
            <ul>
              {usuario.veiculos &&
                usuario.veiculos.map((veiculo) => (
                  <li key={veiculo.ID}>
                    <p>Marca: {veiculo.MarcaVeiculo}</p>
                    <p>Placa: {veiculo.PlacaVeiculo}</p>
                    <p>Modelo: {veiculo.ModeloVeiculo}</p>
                    <p>Ano: {veiculo.AnoVeiculo}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ListaUsuarios;
