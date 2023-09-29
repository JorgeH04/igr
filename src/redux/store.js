import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import usuarioReducer from './reducers';

// Combinar reductores si tienes más de uno
const rootReducer = combineReducers({
  usuario: usuarioReducer
}); 

// Crear el store de Redux
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;