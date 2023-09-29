import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Avatar from './Avatar';
import BotonLike from './BotonLike';
import Comentar from './Comentar';
import { toggleLike, comentar } from '../Helpers/post-helpers';
import { obtenerLikesDeImagen } from '../Helpers/modal-helpers.js';
import LikesModal from './LikesModal';
import toggleSiguiendo from '../Helpers/amistad-helpers';



export default function Post({ post, actualizarPost, mostrarError, usuario, match }) {
  const {
    numLikes,
    numComentarios,
    comentarios,
    _id,
    caption,
    url,
    imageuno,
    usuario: usuarioDelPost,
    estaLike
  } = post;

  
  const [enviandoLike, setEnviandoLike] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likes, setLikes] = useState([]);

  const [enviandoAmistad, setEnviandoAmistad] = useState(false);
  const [cargandoPerfil, setCargandoPefil] = useState(true);
  const [usuarioDueñoDelPerfil, setUsuarioDueñoDelPerfil] = useState(null);




  // useEffect(() => {

  //   async function cargarPostsYUsuario() {
  //     try {
  //       setCargandoPefil(true);
  //       const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
  //    //   const { data: posts } = await Axios.get(`/api/posts/usuario/${usuario._id}`);
    

  //       setUsuarioDueñoDelPerfil(usuario);
  //    //   setPosts(posts);

  //       setCargandoPefil(false);
  //     } catch (error) {
  //       if (
  //         error.response &&
  //         (error.response.status === 404 || error.response.status === 400)
  //       ) {
  //        // setPerfilNoExiste(true);
  //       } else {
  //         mostrarError('Hubo un problema cargando este perfil.');
  //       }
  //       setCargandoPefil(false);
  //     }
  //   }
  //   cargarPostsYUsuario();
  // }, [username]);




 


 

  async function onToggleSiguiendo() {
    if (enviandoAmistad) {
      return;
    }
    try {
      setEnviandoAmistad(true);
      const usuarioActualizado = await toggleSiguiendo(usuarioDueñoDelPerfil);
      setUsuarioDueñoDelPerfil(usuarioActualizado);
      setEnviandoAmistad(false);
    } catch (error) {
      mostrarError(
        'Hubo un problema siguiendo/dejando de seguir a este usuario. Intenta de nuevo'
      );
      setEnviandoAmistad(false);
      console.log(error);
    }
  }



  const obtenerLikesDeImagenModal = async (postId) => {
    try {
      const likesData = await obtenerLikesDeImagen(postId);
      setLikes(likesData);
      setShowLikesModal(true);
    } catch (error) {
      console.error('Error al obtener los likes de la imagen:', error);
    }
  };

  const handleCloseLikesModal = () => {
    setShowLikesModal(false);
  };


  async function onSubmitLike() {
    if (enviandoLike) {
      return;
    }
    try {
      setEnviandoLike(true);
      const postActualizado = await toggleLike(post);
      actualizarPost(post, postActualizado);
      setEnviandoLike(false);
    } catch (error) {
      setEnviandoLike(false);
      mostrarError('Hubo un problema modificando el like. Intenta de nuevo.');
      console.log(error);
    }
  }
  async function onSubmitComentario(mensaje) {
    const postActualizado = await comentar(post, mensaje, usuario);
    actualizarPost(post, postActualizado);
  }



  return (
    <div className="Post-Componente">
      <Avatar usuario={usuarioDelPost} />
      <img src={imageuno} alt={caption} className="Post-Componente__img" />
      <div className="Post-Componente__acciones">
        <div className="Post-Componente__like-container">
          <BotonLike onSubmitLike={onSubmitLike} like={estaLike} />
        </div>
        <p onClick={() => obtenerLikesDeImagenModal(_id)}>Liked por {numLikes} personas</p>
        <button onClick={() => obtenerLikesDeImagenModal(_id)}>Obtener likes</button>
        {showLikesModal && (
        <LikesModal visible={showLikesModal} likes={likes} onClose={handleCloseLikesModal} usuario={usuario} />
      )}
        <ul>
          <li>
            <Link to={`/perfil/${usuarioDelPost.username}`}>
              <b>{usuarioDelPost.username}</b>
            </Link>{' '}
            {caption}
          </li>
          <VerTodosLosComentarios _id={_id} numComentarios={numComentarios} />
          <Comentarios 
             comentarios={comentarios} 
             eliminarComentario={eliminarComentario}
          />
        </ul>
      </div>
      <Comentar onSubmitComentario={onSubmitComentario} />
    </div>
  );
}



function VerTodosLosComentarios({ _id, numComentarios }) {
  if (numComentarios < 4) {
    return null;
  }
  return (
    <li className="text-grey-dark">
      <Link to={`/post/${_id}`}>Ver los {numComentarios} comentarios</Link>
    </li>
  );
}




async function eliminarComentario(comentarioId) {
  try {
    await Axios.delete(`http://localhost:3000/api/posts/comentarios/${comentarioId}`);
    console.log('Comentario eliminado correctamente');
    // Realizar cualquier otra acción necesaria después de eliminar el comentario
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    // Manejar el error de eliminación del comentario
  }
}


function Comentarios({ comentarios, esElPerfilDeLaPersonaLogin, eliminarComentario, post }) {
  if (comentarios.length === 0) {
    return null;
  }
  return comentarios.map(comentario => {
    return (
      <li key={comentario._id}>
        <Link to={`/perfil/${comentario.usuario.username}`}>
          <b>{comentario.usuario.username}</b>
        </Link>{' '}
        {comentario.mensaje}
       
        {esElPerfilDeLaPersonaLogin && ( 
          <button onClick={() => eliminarComentario(comentario._id)}>
               Eliminar
          </button>)}
 
      </li>
    );
  });
}








function BotonSeguir({ siguiendo, toggleSiguiendo }) {
  return (
    <button onClick={toggleSiguiendo} className="Perfil__boton-seguir">
      {siguiendo ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
}
