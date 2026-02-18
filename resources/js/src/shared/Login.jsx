import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../Index/styles.css";
import React from "react";

import { IndexHelperContext } from "../Index/helpers/IndexHelper";
import { useContext } from "react";
import Header from "../shared/Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Login() {

    let { comprobarUsuario } = useContext(IndexHelperContext)

      function procesa(ev) {
            ev.preventDefault();
            const obj = {
              email: ev.target.email.value,
              contrasena: ev.target.passw.value
            }      
            comprobarUsuario(obj);
        }

        

  return ( 
    <>
      <Header />
      <main className="main">
      <div className="formulario login" id="loginModal" tabIndex="">
        <div>
          <div className="modal-content modal-content-custom text-white">
            <div className="modal-header border-0">
              <h2 className="encabezados-formularios">Iniciar Sesión</h2>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form id="loginForm" onSubmit={procesa}
              >
                <div className="mb-3">
                  <label for="loginEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-dark"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label for="loginPassword" className="form-label">
                    Contraseña
                  </label>
                  <input
                  name="passw"
                    type="password"
                    className="form-control form-control-dark"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 py-3 mb-3"

                >
                  Iniciar Sesión
                </button>

                <hr className="my-4 border-secondary" />
                <div className="text-center">
                  <p className="mb-2 text-gray-custom text-dark">¿No tienes cuenta?</p>
                  <button 
                    type="button"
                    className="btn btn-outline-dark w-100 text"
                    
                  >
                    <Link to="/register">Crear cuenta</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer/>

    </>
  )
}

export default Login
