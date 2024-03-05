import { Component } from "react";
import Banner from "../Banner/banner";
import "./navbar.css";

export class NavButtons extends Component {
  render() {
    return (
      <>
        <div className="NavigationHeader">
          <Banner />
          <button>
            <a href="/Home">Inicio</a>
          </button>
          <button>
            <a href="/BuscarFretes">Buscar Mercadorias</a>
          </button>
          <button>
            <a href="/FaleConosco">Fale Conosco</a>
          </button>
          <button>
            <a href="/Configuracoes">Configuracoes</a>
          </button>
        </div>
      </>
    );
  }
}
