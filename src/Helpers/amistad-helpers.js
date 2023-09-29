import Axios from 'axios';


export default async function toggleSiguiendo(usuario) {
  let usuarioActualizado;
  if (usuario.siguiendo) {
    await Axios.delete(`http://localhost:3000/api/amistades/${usuario._id}/eliminar`);
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores - 1,
      siguiendo: false
    };
  } else {
    await Axios.post(`http://localhost:3000/api/amistades/${usuario._id}/seguir`);
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores + 1,
      siguiendo: true
    };
  }
  return usuarioActualizado;
}