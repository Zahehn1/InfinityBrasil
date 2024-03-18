import { Routes, Route } from "react-router-dom";

import HomePage from "../user/HomePage/HomePage";
import { ClientPage } from "../user/userPage";
import { RegisterForm } from "../registerForm/register";
import { PainelAdmin } from "../admin/adminPanel/PainelADM";
import { LoginForm } from "../LoginForm/loginForm";
import { BuscaCargas } from "../searchDelivery/Search";
import { Settings } from "../config/settings";
import { FaleConosco } from "../talkWus/SAC";
//não mexer.

//colocar rotas aqui dentro nas proximas vezes.

const Rotas = () => (
  <Routes>
    <Route exact path="/" title element={<LoginForm />} />
    <Route exact path="/Registro" element={<RegisterForm />} />
    <Route exact path="/050900" element={<PainelAdmin />} />
    <Route exact path="/login" element={<LoginForm />} />
    <Route exact path="/User" element={<ClientPage />} />
    <Route exact path="/BuscarFretes" element={<BuscaCargas />} />
    <Route exact path="/Configuracoes" element={<Settings />} />
    <Route exact path="/FaleConosco" element={<FaleConosco />} />
  </Routes>
);

export default Rotas;
