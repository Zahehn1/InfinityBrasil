import React, { useState, useEffect } from "react";
import axios from "axios";
const ListaCargas = () => {
  const [cargas, setCargas] = useState([]);

  useEffect(() => {
    const fetchCargas = async () => {
      try {
        const response = await axios.get("http://localhost:3031/cargas");
        setCargas(response.data);
      } catch (error) {
        console.error("Erro ao buscar cargas:", error);
      }
    };

    fetchCargas();
  }, []);

  const handleAlterarStatus = async (cargaId, novoStatus) => {
    try {
      const response = await axios.post(
        `http://localhost:3031/alterar-status-carga/${cargaId}`,
        {
          status: novoStatus,
        }
      );

      if (response.status === 200) {
        // Atualizar o estado da carga localmente após a alteração
        setCargas((prevCargas) =>
          prevCargas.map((carga) =>
            carga.ID === cargaId ? { ...carga, status: novoStatus } : carga
          )
        );
      }
    } catch (error) {
      console.error("Erro ao alterar status da carga:", error);
    }
  };

  return (
    <>
      <form>
        <div>
          <h2>Lista de Cargas</h2>
          <ul>
            {cargas.map((carga) => (
              <li key={carga.ID}>
                <p>Nome: {carga.nome}</p>
                <p>Peso: {carga.peso}</p>
                <p>Valor: {carga.valor}</p>
                <p>Distância: {carga.distancia}</p>
                <p>Descrição: {carga.descricao}</p>
                <p>Status: {carga.status}</p>
                {/* Dropdown para selecionar o novo status da carga */}
                <select
                  value={carga.status}
                  onChange={(e) =>
                    handleAlterarStatus(carga.ID, e.target.value)
                  }
                >
                  <option value="aceito">Aceito</option>
                  <option value="aguardando">Aguardando Motorista</option>
                  <option value="entregue">Entregue</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  );
};
export default ListaCargas;
