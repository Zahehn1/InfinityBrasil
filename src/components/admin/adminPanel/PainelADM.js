import React, { Component } from "react";
import { NavBar } from "../../navbar/navbar.js";
import { UparCarga } from "./uparcargaadm.js";
import FreteCalculator from "../freteCalc.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListaUsuarios from "./showUsers.js";
import ListaCargas from "./listarcarga.js";

export class PainelAdmin extends Component {
  render() {
    return (
      <>
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
          theme="dark"
        />
        <NavBar />
        <ListaCargas />
        <ListaUsuarios />
        <UparCarga />

        <FreteCalculator />
      </>
    );
  }
}
