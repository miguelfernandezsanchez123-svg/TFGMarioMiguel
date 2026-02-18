import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Route, Routes } from "react-router-dom";
// Importaciones de los diferentes Componentes y sus Provider
import Index from "./Index/Index";
import Register from "./shared/Register";
import React from "react";


import Perfil from "./Perfil/Perfil";
import { IndexHelperProvider } from "./Index/helpers/IndexHelper";
import Login from "./shared/Login";
import SelectioAsiento from "./shared/SelectioAsiento";
import Eventos from "./shared/Eventos";

export default function App() {
  return (
    <>
      <IndexHelperProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/selectorAsiento" element={<SelectioAsiento/>}/>
          <Route path="/eventos" element={<Eventos/>}/>
        </Routes>
      </IndexHelperProvider>
    </>
  );
}
