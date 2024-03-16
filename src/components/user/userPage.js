import { LoginForm } from "../LoginForm/loginForm";
import { NavBar } from "../navbar/navbar";

export const ClientPage = () => {
  return (
    <>
      <NavBar />
      <p>CPF TESTE: 000.000.000-00</p>
      <p>SENHA TESTE: admin</p>
      <p>ou basta alterar url para /050900</p>
      <LoginForm />
    </>
  );
};
export default ClientPage;
