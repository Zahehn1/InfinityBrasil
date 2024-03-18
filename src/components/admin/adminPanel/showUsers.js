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

  const handleTipoUsuarioChange = async (usuarioId, novoTipoUsuario) => {
    try {
      await axios.put(`http://localhost:3031/usuarios/${usuarioId}`, {
        SuperUser: novoTipoUsuario === "Super Usuário" ? 1 : 0,
      });
      // Atualiza a lista de usuários após a alteração
      const response = await axios.get("http://localhost:3031/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao atualizar o tipo de usuário:", error);
    }
  };

  return (
    <div>
      <form>
        <h2>Lista de Usuários</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>CPF</th>
              <th>Nome Completo</th>
              <th>Email</th>
              <th>Tipo de Acesso</th>
              <th>Editar Tipo</th> {/* Adiciona uma coluna para editar */}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.ID}>
                <td>{usuario.ID}</td>
                <td>{usuario.CPF}</td>
                <td>{usuario.NomeCompleto}</td>
                <td>{usuario.Email}</td>
                <td>
                  {usuario.SuperUser === 1 ? "Super Usuário" : "Usuário Normal"}
                </td>
                <td>
                  <select
                    value={
                      usuario.SuperUser === 1
                        ? "Super Usuário"
                        : "Usuário Normal"
                    }
                    onChange={(e) =>
                      handleTipoUsuarioChange(usuario.ID, e.target.value)
                    }
                  >
                    <option value="Super Usuário">Super Usuário</option>
                    <option value="Usuário Normal">Usuário Normal</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ListaUsuarios;
