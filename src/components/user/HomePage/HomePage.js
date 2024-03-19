import { Component } from "react";
import { NavBar } from "../../navbar/navbar";
import { LoginForm } from "../../LoginForm/loginForm";
import ListarCargas from "../../admin/adminPanel/listarcarga";

export class HomePage extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ListarCargas />
      </>
    );
  }
}
export default HomePage;
