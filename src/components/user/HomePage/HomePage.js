import { Component } from "react";
import { NavBar } from "../../navbar/navbar";
import { LoginForm } from "../../form/loginForm";

export class HomePage extends Component {
  render() {
    return (
      <>
        <NavBar />
        <LoginForm />
      </>
    );
  }
}
export default HomePage;
