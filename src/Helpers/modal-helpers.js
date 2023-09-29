import Axios from 'axios';

export async function obtenerSeguidos(usuarioDueñoDelPerfil, setSeguidos, setShowModal, mostrarError) {
  try {
    
    const { data: seguidos } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/amistades/${usuarioDueñoDelPerfil._id}/siguiendo`);

  //  const { data: seguidos } = await Axios.get(`/api/amistades/${usuarioDueñoDelPerfil._id}/siguiendo`);
    console.log(seguidos);
    setSeguidos(seguidos);
    setShowModal(true);
  } catch (error) {
    mostrarError('Ocurrió un error al obtener los seguidores del usuario.');
  }
}

export async function obtenerSeguidores(usuarioDueñoDelPerfil, setSeguidores, setShowModall, mostrarError) {
  try {
    
    const { data: seguidores } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/amistades/${usuarioDueñoDelPerfil._id}/seguidores`);

   // const { data: seguidores } = await Axios.get(`/api/amistades/${usuarioDueñoDelPerfil._id}/seguidores`);
    console.log(seguidores);
    setSeguidores(seguidores);
    setShowModall(true);
  } catch (error) {
    mostrarError('Ocurrió un error al obtener los seguidores del usuario.');
  }
}



export async function obtenerLikesDeImagen(postId) {
  try {
    
    const response = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/posts/${postId}/ledilike`);
  //  const response = await Axios.get(`http://localhost:3000/api/posts/${postId}/ledilike`);
    const likesData = response.data;
    console.log('Likes de la imagen:', likesData);
    return likesData;
  } catch (error) {
    console.error('Error al obtener los likes de la imagen:', error);
    return [];
  }
}