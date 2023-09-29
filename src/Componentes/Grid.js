import React, { useState } from 'react';
import Axios from 'axios';
import LikesModal from './LikesModal';
import { obtenerLikesDeImagen } from '../Helpers/modal-helpers.js';
import { Link, useHistory } from 'react-router-dom';


export default function Grid({ posts, esElPerfilDeLaPersonaLogin }) {
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likes, setLikes] = useState([]); 

  
  const columnas = posts.reduce((columnas, post) => {
    const ultimaColumna = columnas[columnas.length - 1];
    if (ultimaColumna && ultimaColumna.length < 3) {
      ultimaColumna.push(post);
    } else {
      columnas.push([post]);
    }
    return columnas;
  }, []);



 

  // const obtenerLikesDeImagen = async (postId) => {
  //   try {
  //     const response = await Axios.get(
  //       `http://localhost:3000/api/posts/${postId}/ledilike`
  //     );
  //     const likesData = response.data;
  //     console.log('Likes de la imagen:', likesData);
  //      setLikes(likesData); // Actualizar el estado con los nombres de las personas que dieron like
  //     setShowLikesModal(true);
  //   } catch (error) {
  //     console.error('Error al obtener los likes de la imagen:', error);
  //   }
  // };


  const obtenerLikesDeImagenModal = async (postId) => {
    try {
      const likesData = await obtenerLikesDeImagen(postId);
      setLikes(likesData); // Actualizar el estado con los nombres de las personas que dieron like
      setShowLikesModal(true);
    } catch (error) {
      console.error('Error al obtener los likes de la imagen:', error);
    }
  };

  const history = useHistory();

  async function eliminarPost(postId) {
    try {
      await Axios.delete(`http://localhost:3000/api/posts/posts/${postId}`);
      console.log('Post eliminado correctamente');
       history.push('/');
    } catch (error) {
      console.error('Error al eliminar el post:', error);
     }
  }

  // async function handleObtainLikes() {
  //   await obtenerLikesDeImagen(postId);
  // }



  const handleCloseLikesModal = () => {
    setShowLikesModal(false);
   };

  return (
    <div  style={{ marginLeft: '5rem' }}>
      {columnas.map((columna, index) => {
        return (
          <div key={index} className="Grid__row">
            {columna.map((post) => (
              <div key={post._id} className="Grid__post">
                <Link to={`/post/${post._id}`}>
                  <img
                    src={post.imageuno}
                    alt={post.caption}
                    className="Grid__post-img"
                  />
                </Link>
                {esElPerfilDeLaPersonaLogin && (
                  <button onClick={() => eliminarPost(post._id)}>
                    Eliminar
                  </button>
                )}

                <button onClick={() => obtenerLikesDeImagenModal(post._id)}>
                  Obtener likes
                </button>
              </div>
            ))}
          </div>
        );
      })}
      {showLikesModal && (
        <LikesModal visible={showLikesModal} likes={likes} onClose={handleCloseLikesModal} />
      )}
    </div>
  );
}