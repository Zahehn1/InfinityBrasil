import React, { Component } from "react";
import { NavBar } from "../../navbar/navbar.js";
import { UparCarga } from "./uparcargaadm.js";
import FreteCalculator from "../freteCalc.js";

export class PainelAdmin extends Component {
  render() {
    return (
      <>
        <NavBar />
        <UparCarga />
        <FreteCalculator />
      </>
    );
  }
}
