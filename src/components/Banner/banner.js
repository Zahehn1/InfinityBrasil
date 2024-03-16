import "./banner.css";
import Foto from "../imgs/infinityBrasil.png";
import "../navbar/navbar.css";
import "../Banner/banner.css";

function Logofoto() {
  return (
    <ul>
      <div className="NavigationHeader">
        <img src={Foto} alt="Logotipo" />
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
    </ul>
  );
}

export default Logofoto;
