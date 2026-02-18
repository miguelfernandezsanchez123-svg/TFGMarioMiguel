import { useContext } from "react";
import { IndexHelperContext } from "../Index/helpers/IndexHelper";
import { Link } from 'react-router-dom';
import React from "react";

function Header() {
  const { usuarioLogueado, cerrarSesion } = useContext(IndexHelperContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg gradient-purple navbar-dark navbar-custom shadow">
        <div className="container">
          {/* Logo siempre visible */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <span className="fs-4 fw-bold">
              <img className="logo_encabezado" src="logo_sin_fondo.png" alt="Logo Eventium"/>
            </span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              
              {!usuarioLogueado ? (
                /* --- CASO A: SI NO HAY SESIÓN (Invitado) --- */
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link fw-bold">Iniciar Sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-light ms-lg-3 px-4 rounded-pill">Crear cuenta</Link>
                  </li>
                </>
              ) : (
                /* --- CASO B: SI HAY SESIÓN (Usuario) --- */
                <>
                  <li className="nav-item">
                    <Link to={`/perfil/${usuarioLogueado.uid}`} className="nav-link">
                      <i className="bi bi-person me-2"></i>Mi Perfil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/mis-entradas/${usuarioLogueado.uid}`} className="nav-link">
                      <i className="bi bi-ticket me-2"></i>Mis Entradas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/mis-puntos/${usuarioLogueado.uid}`} className="nav-link">
                      <i className="bi bi-star me-2"></i>Mis Puntos
                    </Link>
                  </li>
                  <li className="nav-item ms-lg-3">
                    {/* Botón de cerrar sesión llamando a la función del contexto */}
                    <button 
                      onClick={cerrarSesion} 
                      className="btn btn-outline-danger btn-sm border-0"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Salir
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;