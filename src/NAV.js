import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./styles.css";
import logo from "./imgs/logo.png";

export default function NAV() {
  return (
    <div className="NAV">
      <img src={logo} alt="BoardGame Buddies Logo" />
      <Link to="/">Home</Link>
      <Link to="/Games">Games</Link>
      <Link to="/Log">Log Game</Link>
    </div>
  );
}
