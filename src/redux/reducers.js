import {
    CARGAR_USUARIO,
    LOGIN,
    SIGNUP,
    LOGOUT,
    MOSTRAR_ERROR,
    ESCONDER_ERROR
  } from './actionTypes';
  
  // Estado inicial
  const initialState = { 
    cargandoUsuario: true,
    usuario: null,
    error: null
  };
  
  // Reductor de usuario
  const usuarioReducer = (state = initialState, action) => {
    switch (action.type) {
      case CARGAR_USUARIO:
        return {
          ...state,
          cargandoUsuario: false,
          usuario: action.payload
        };
      case LOGIN:
      case SIGNUP:
        return {
          ...state,
          usuario: action.payload.usuario,
          error: null
        };
      case LOGOUT:
        return {
          ...state,
          usuario: null,
          error: null
        };
      case MOSTRAR_ERROR:
        return {
          ...state,
          error: action.payload
        };
      case ESCONDER_ERROR:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default usuarioReducer;