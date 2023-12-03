import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import NAV from "./NAV";
import Home from "./Home";
import Games from "./Games";
import Log from "./Log";
import Statistics from "./Statistics";

export default function App() {
  return (
    <div className="App">
      <Router>
        <NAV />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/Log" element={<Log />} />
          <Route path="/Statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  );
}
