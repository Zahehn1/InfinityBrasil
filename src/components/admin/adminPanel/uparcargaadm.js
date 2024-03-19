import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../adminPanel/formcarga.css";

export const UparCarga = () => {
  const [cargas, setCargas] = useState([]);
  const [idCarga, setIdCarga] = useState("");
  const [nomeCarga, setNomeCarga] = useState("");
  const [pesoCarga, setPesoCarga] = useState("");
  const [descricaoCarga, setDescricaoCarga] = useState("");
  const [valorCarga, setValorCarga] = useState("");
  const [distanciaCarga, setDistanciaCarga] = useState("");
  const [statusCarga, setStatusCarga] = useState("aguardando_motorista");

  useEffect(() => {
    // Aqui você pode fazer uma solicitação para obter a lista de cargas do servidor
    // Substitua este trecho pelo código para obter as cargas do servidor
    const cargasFromServer = [
      {
        id: 1,
        nome: "Carga 1",
        peso: "100",
        descricao: "Descrição da carga 1",
        valor: "200",
        distancia: "10",
        status: "aguardando_motorista",
      },
      {
        id: 2,
        nome: "Carga 2",
        peso: "150",
        descricao: "Descrição da carga 2",
        valor: "250",
        distancia: "20",
        status: "aceito",
      },
    ];

    setCargas(cargasFromServer);
  }, []);

  const handleChangeIdCarga = (e) => {
    setIdCarga(e.target.value);
  };

  const handleChangeNomeCarga = (e) => {
    setNomeCarga(e.target.value);
  };

  const handleChangePesoCarga = (e) => {
    setPesoCarga(e.target.value);
  };

  const handleChangeDescricaoCarga = (e) => {
    setDescricaoCarga(e.target.value);
  };

  const handleChangeValorCarga = (e) => {
    setValorCarga(e.target.value);
  };

  const handleChangeDistanciaCarga = (e) => {
    setDistanciaCarga(e.target.value);
  };

  const handleChangeStatusCarga = (e) => {
    setStatusCarga(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cargaData = {
      id: idCarga,
      nome: nomeCarga,
      peso: pesoCarga,
      descricao: descricaoCarga,
      valor: valorCarga,
      distancia: distanciaCarga,
      status: statusCarga,
    };

    try {
      const response = await fetch("http://localhost:3031/adicionar-carga", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cargaData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar carga");
      }

      toast.success("Carga adicionada com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Limpar os campos do formulário após o envio
      setIdCarga("");
      setNomeCarga("");
      setPesoCarga("");
      setDescricaoCarga("");
      setValorCarga("");
      setDistanciaCarga("");
      setStatusCarga("aguardando_motorista");
    } catch (error) {
      console.error("Erro ao salvar carga:", error);
      toast.error("Erro ao salvar carga", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleExcluirCarga = async (cargaId) => {
    try {
      // Enviar uma solicitação DELETE para excluir a carga do servidor
      const response = await fetch(
        `http://localhost:3031/excluir-carga/${cargaId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir carga");
      }

      // Remover a carga excluída da lista de cargas no estado
      const updatedCargas = cargas.filter((carga) => carga.id !== cargaId);
      setCargas(updatedCargas);

      // Exibir uma mensagem de sucesso
      toast.success("Carga excluída com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Erro ao excluir carga:", error);
      // Exibir uma mensagem de erro
      toast.error("Erro ao excluir carga", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="UparCargas">
        <container>
          <section>
            <form onSubmit={handleSubmit}>
              <label>ID da carga:</label>
              <input
                type="text"
                value={idCarga}
                onChange={handleChangeIdCarga}
                required
              />
              <label>Nome da carga:</label>
              <input
                type="text"
                value={nomeCarga}
                onChange={handleChangeNomeCarga}
                required
              />
              <label>Peso da carga (KG):</label>
              <input
                type="text"
                value={pesoCarga}
                onChange={handleChangePesoCarga}
                required
              />
              <label>Descrição da carga:</label>
              <input
                type="text"
                value={descricaoCarga}
                onChange={handleChangeDescricaoCarga}
                required
              />
              <label>Valor da carga:</label>
              <input
                type="text"
                value={valorCarga}
                onChange={handleChangeValorCarga}
                required
              />
              <label>Distância da carga (KM):</label>
              <input
                type="text"
                value={distanciaCarga}
                onChange={handleChangeDistanciaCarga}
                required
              />
              <label>Status da carga:</label>
              <select
                value={statusCarga}
                onChange={handleChangeStatusCarga}
                required
              >
                <option value="aguardando_motorista">
                  Aguardando Motorista
                </option>
                <option value="aceito">Aceito</option>
                <option value="entregue">Entregue</option>
              </select>
              <button type="submit">Adicionar Carga</button>
            </form>
          </section>
        </container>
      </div>
    </>
  );
};
