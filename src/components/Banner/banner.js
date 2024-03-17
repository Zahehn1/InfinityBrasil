import "./banner.css";
import Foto from "../imgs/infinityBrasil.png";
import "../navbar/navbar.css";
import "../Banner/banner.css";
import { Link } from "react-router-dom";

function Logofoto() {
  return (
    <ul>
      <div className="NavigationHeader">
        <img src={Foto} alt="Logotipo" />
        <button>
          <Link to="/Home">Início</Link>
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
    </ul>
  );
}

export default Logofoto;
