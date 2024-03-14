import "./banner.css";
import ImagemLogo from "../imgs/infinityBrasil.png";

function Banner() {
  return (
    <div className="banner">
      <img src={ImagemLogo} alt="Logotipo" />
    </div>
  );
}

export default Banner;
