import { createContext, useEffect, useState } from "react";
import { auth, guardarUsuarios, recibirUsuarios } from "./firebase";
import { useNavigate } from "react-router-dom";
import React from "react";


// Funciones de Firebase para mantener la sesión iniciada
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const IndexHelperContext = createContext();

export const IndexHelperProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  // aqui se pueden agregar mas estados y funciones

  useEffect(() => {
    async function inicio() {   
        const datos = await recibirUsuarios()
        setUsuarios(datos)
    }
    inicio()

    const desuscribir = onAuthStateChanged(auth, (user) => {
      if(user){
        setUsuarioLogueado(user);
      }else{
        setUsuarioLogueado(null);
      }
      setCargando(false)
    });

    return () => desuscribir();
  }, []);


  async function comprobarUsuario(obj){
    try{
      await signInWithEmailAndPassword(auth, obj.email, obj.contrasena);
      alert("Sesión iniciada con éxito");
      navigate("/");
    }catch{
      alert("Error: Usuario o contraseña incorrectos")
    }
  }

  async function registrarUsuario(obj){
    try{
      const usuarioCredenciales = await createUserWithEmailAndPassword(auth, obj.user, obj.contrasena);
      
      const nuevoUsuario = {...obj, uid: usuarioCredenciales.user.uid};
      const arrayUsuarios = [...usuarios, nuevoUsuario];

      setUsuarios(arrayUsuarios);
      await guardarUsuarios(arrayUsuarios);

      alert("Usuario registrado con éxito");
      navigate("/");
    }catch(error){
      alert("Error al registrar: "+ error.message)
    }

  }

 const cerrarSesion = async () => {
  try{
    await signOut(auth)
    navigate("/")
  }catch (error){
    console.error("Error al cerrar sesión", error)
  }
 }

  async function eliminarUsuario(uid){
    const nuevosUsuarios = usuarios.filter((elemento) => elemento.uid !== uid);
    setUsuarios(nuevosUsuarios)
    await guardarUsuarios(nuevosUsuarios);

    await auth.currentUser.delete();


    alert("Has eliminado tu usuario. ¡Nos vemos pronto!")
    navigate("/");

  }

  async function cambiarNombre(uid, obj){
    const nuevosUsuarios = usuarios.map((elemento) =>{
      if(elemento.uid === uid){
        return {...elemento,
                nombre: obj.nombre, 
                apellidos: obj.apellidos}
      }
      return elemento
    })

    setUsuarios(nuevosUsuarios)
    guardarUsuarios(nuevosUsuarios)
    
    alert("Has cambiado tu nombre con éxito")
    navigate("/")
  }


  return (
    <IndexHelperContext.Provider value={{ usuarios, usuarioLogueado, setUsuarios, registrarUsuario, cerrarSesion, comprobarUsuario, eliminarUsuario, cambiarNombre }}>
      {!cargando && children}
    </IndexHelperContext.Provider>
  );
};
