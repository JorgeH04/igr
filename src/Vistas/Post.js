import React, { useState, useEffect, useRef  } from 'react';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Avatar from '../Componentes/Avatar';
import Comentar from '../Componentes/Comentar';
import BotonLike from '../Componentes/BotonLike';
import RecursoNoExiste from '../Componentes/RecursoNoExiste';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { toggleLike, comentar } from '../Helpers/post-helpers';
import LikesModal from '../Componentes/LikesModal';
import ModalEditPost from '../Componentes/ModalEditPost';
import { obtenerLikesDeImagen } from '../Helpers/modal-helpers.js';


export default function PostVista({ mostrarError, match, usuario }) {
  const postId = match.params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postNoExiste, setPostNoExiste] = useState(false);
  const [enviandoLike, setEnviandoLike] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likes, setLikes] = useState([]); 
  const [showMenu, setShowMenu] = useState(false);
  const [newCaption, setNewCaption] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  
  useEffect(() => {
    async function cargarPost() {
      try {
        
        const { data: post } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/posts/${postId}`);
     //   const { data: post } = await Axios.get(`http://localhost:3000/api/posts/${postId}`);
        setPost(post);
        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPostNoExiste(true);
        } else {
          mostrarError('Hubo un problema cargando este post.');
        }
        setLoading(false);
      }
    }
    cargarPost();
  }, [postId]);

  const history = useHistory();


  

  async function eliminarPost() {
    try {
      
      await Axios.delete(`https://igback-ec39561a3d0d.herokuapp.com/api/posts/posts/${postId}`);
   //   await Axios.delete(`http://localhost:3000/api/posts/posts/${postId}`);
      console.log('Post eliminado correctamente');
      history.push('/');
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  }


  const obtenerLikesDeImagenModal = async (postId) => {
    try {
      const likesData = await obtenerLikesDeImagen(postId);
      setLikes(likesData); // Actualizar el estado con los nombres de las personas que dieron like
      setShowLikesModal(true);
    } catch (error) {
      console.error('Error al obtener los likes de la imagen:', error);
    }
  };
 
  const handleCloseLikesModal = () => {
    setShowLikesModal(false);
   };


  async function onSubmitComentario(mensaje) {
    const postActualizado = await comentar(post, mensaje, usuario);
    setPost(postActualizado);
  }
  
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  async function onSubmitLike() {
    if (enviandoLike) {
      return;
    }
    try {
      setEnviandoLike(true);
      const postActualizado = await toggleLike(post);
      setPost(postActualizado);
      setEnviandoLike(false);
    } catch (error) {
      setEnviandoLike(false);
      mostrarError('Hubo un problema modificando el like. Intenta de nuevo.');
      console.log(error);
    }
  }
  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (postNoExiste) {
    return (
      <RecursoNoExiste mensaje="El post que estas intentando ver no existe" />
    );
  }
  if (post == null) {
    return null;
  }
  return (
    <Main center>
      <Post
        {...post}
        onSubmitComentario={onSubmitComentario}
        onSubmitLike={onSubmitLike}
        eliminarPost={eliminarPost}
        likes={likes}
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal} 
        />
    </Main>
  );
}


 








function Post({
  comentarios,
  caption,
  url,
  imageuno,
  usuario,
  estaLike,
  onSubmitLike,
  onSubmitComentario,
  eliminarPost,
  handleCloseLikesModal,
  showLikesModal,
  likes,
  showMenu,
  toggleMenu,
  showEditModal,
  setShowEditModal
}) {
  return (
<div className="Post">
  <div className="Post__image-container">
     <img src={imageuno} alt={caption} />
  </div>
  <div className="Post__side-bar">
    <div className="Post__header">
        <Avatar usuario={usuario} />
      <div className="dropdown-button">
        <button  onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#8795a1" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
        {showMenu && (
          <div className="dropdown-content">
             <a href="#" className="dropdown-item"  onClick={eliminarPost}>Eliminar</a>
             <a href="#" className="dropdown-item"  onClick={() => setShowEditModal(true)}>Editar</a>            
          </div>
       )}
    </div>
  </div>
  {showLikesModal && (
       <LikesModal 
          visible={showLikesModal} 
          likes={likes} 
          onClose={handleCloseLikesModal} 
          />
  )}

  {showEditModal && (
       <ModalEditPost
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          
          />
   )}

  <div className="Post__comentarios-y-like">
    <Comentarios usuario={usuario} caption={caption} comentarios={comentarios} />
    <div className="Post__like">
      <BotonLike onSubmitLike={onSubmitLike} like={estaLike} />
    </div>
    <Comentar onSubmitComentario={onSubmitComentario} />
  </div>
</div>
</div>
  );
}






function Comentarios({ usuario, caption, comentarios }) {
  return (
    <ul className="Post__comentarios">
      <li className="Post__comentario">
        <Link
          to={`/perfil/${usuario.username}`}
          className="Post__autor-comentario"
        >
          <b>{usuario.username}</b>
        </Link>{' '}
        {caption}
      </li>
      {comentarios.map(comentario => (
        <li className="Post__comentario" key={comentario._id}>
          <Link
            to={`/perfil/${comentario.usuario.username}`}
            className="Post__autor-comentario"
          >
            <b>{comentario.usuario.username}</b>
          </Link>{' '}
          {comentario.mensaje}
        </li>
      ))}
    </ul>
  );
}












