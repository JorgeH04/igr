import Axios from 'axios';
import {
  CARGAR_USUARIO,
  LOGIN,
  SIGNUP,
  LOGOUT,
  MOSTRAR_ERROR, 
  ESCONDER_ERROR
} from './actionTypes';   

// Acción para cargar el usuario
export const cargarUsuario = () => {
  return async (dispatch) => {
    try {
      const { data: usuario } = await Axios.get('/api/usuarios/whoami');
      dispatch({ type: CARGAR_USUARIO, payload: usuario });
    } catch (error) {
      console.log(error);
    }
  };
};

// Acción para iniciar sesión
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post('/api/usuarios/login', {
        email,
        password
      });
      dispatch({ type: LOGIN, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

// Acción para registrarse
export const signup = (usuario) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post('/api/usuarios/signup', usuario);
      dispatch({ type: SIGNUP, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

// Acción para cerrar sesión
export const logout = () => {
  return { type: LOGOUT };
};

// Acción para mostrar error
export const mostrarError = (mensaje) => {
  return { type: MOSTRAR_ERROR, payload: mensaje };
};

// Acción para esconder error
export const esconderError = () => {
  return { type: ESCONDER_ERROR };
};