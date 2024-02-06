import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClientPage } from "./components/user/userPage";
import { HomePage } from "./components/user/HomePage/HomePage";
import { PainelAdmin } from "./components/admin/adminPanel/PainelADM";
import { BuscaCargas } from "./components/searchDelivery/Search";
import { Settings } from "./components/config/settings";
import { FaleConosco } from "./components/talkWus/SAC";
import { RegisterForm } from "./components/registerForm/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientPage />,
  },
  {
    path: "/Registro",
    element: <RegisterForm />,
  },
  {
    path: "/adminPage",
    element: <PainelAdmin />,
  },
  {
    path: "/login",
    element: <ClientPage />,
  },
  {
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: "/BuscarFretes",
    element: <BuscaCargas />,
  },
  {
    path: "/Configuracoes",
    element: <Settings />,
  },
  {
    path: "/FaleConosco",
    element: <FaleConosco />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
