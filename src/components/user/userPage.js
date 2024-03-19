import { LoginForm } from "../LoginForm/loginForm";
import ListarCargas from "../admin/adminPanel/listarcarga";
import { NavBar } from "../navbar/navbar";

export const ClientPage = () => {
  return (
    <>
      <NavBar />
      <ListarCargas />
    </>
  );
};
export default ClientPage;
