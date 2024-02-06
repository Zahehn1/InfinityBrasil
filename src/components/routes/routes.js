import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PainelADM from "../admin/adminPanel/PainelADM";
import { ClientPage } from "../user/userPage";

const Rotas = () => {
  return (
    <Router>
      <Switch>
        <Route path="/adminPage" component={PainelADM} />
        <Route path="/erro" component={ClientPage} />
      </Switch>
    </Router>
  );
};

export default Rotas;
