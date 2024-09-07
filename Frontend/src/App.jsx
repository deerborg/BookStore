import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Auhtor from "./components/Author/Author";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="general-container">
        <Navbar></Navbar>
        <Auhtor></Auhtor>
      </div>
    </>
  );
}

export default App;
