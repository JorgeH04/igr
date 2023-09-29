import React, { useState, useEffect } from 'react';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Grid from '../Componentes/Grid';
import RecursoNoExiste from '../Componentes/RecursoNoExiste';
import Axios from 'axios';
import stringToColor from 'string-to-color';
import toggleSiguiendo from '../Helpers/amistad-helpers';
import useEsMobil from '../Hooks/useEsMobil';
import ModalFollowers from '../Componentes/ModalFollowers';
import ModalFollowing from '../Componentes/ModalFollowing';
 
 

export default function Perfil({ mostrarError, usuario, match, logout, post }) {
  const username = match.params.username;
  const [usuarioDueñoDelPerfil, setUsuarioDueñoDelPerfil] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cargandoPerfil, setCargandoPefil] = useState(true);
  const [perfilNoExiste, setPerfilNoExiste] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [enviandoAmistad, setEnviandoAmistad] = useState(false);
  const [mostrarSeguidores, setMostrarSeguidores] = useState(false);
  const [seguidos, setSeguidos] = useState([]);
  const [seguidores, setSeguidores] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModall, setShowModall] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const esMobil = useEsMobil();
  const [edicionActivada, setEdicionActivada] = useState(false);
  const [nuevosDatos, setNuevosDatos] = useState({});
  const [modalContent, setModalContent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {

    async function cargarPostsYUsuario() {
      try {
        setCargandoPefil(true);
        
        const { data: usuario } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/usuarios/${username}`);
        const { data: posts } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/posts/usuario/${usuario._id}`);
        const usuarioxs  = await Axios.get('https://igback-ec39561a3d0d.herokuapp.com/api/usuarios/explore').then(({ data }) => data)
        // const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
        // const { data: posts } = await Axios.get(`/api/posts/usuario/${usuario._id}`);
        // const usuarioxs  = await Axios.get('/api/usuarios/explore').then(({ data }) => data)
        setUsuarios(usuarioxs);

        setUsuarioDueñoDelPerfil(usuario);
        setPosts(posts);

        setCargandoPefil(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPerfilNoExiste(true);
        } else {
          mostrarError('Hubo un problema cargando este perfil.');
        }
        setCargandoPefil(false);
      }
    }
    cargarPostsYUsuario();
  }, [username]);





  const habilitarEdicion = () => {
    setNuevosDatos({
      username: usuarioDueñoDelPerfil.username,
      nombre: usuarioDueñoDelPerfil.nombre,
      bio: usuarioDueñoDelPerfil.bio
    });
    setEdicionActivada(true);
  };

  const guardarCambios = async () => {
    try {
      
      await Axios.put(`https://igback-ec39561a3d0d.herokuapp.com/api/usuarios/${usuarioDueñoDelPerfil._id}`, nuevosDatos);
     // await Axios.put(`/api/usuarios/${usuarioDueñoDelPerfil._id}`, nuevosDatos);
     // await cargarPostsYUsuario();
      setEdicionActivada(false);
    } catch (error) {
      mostrarError('Hubo un problema al guardar los cambios.');
      console.error(error);
    }
  };


  async function obtenerSeguidos() {
    try {
      
      const { data: seguidos } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/amistades/${usuarioDueñoDelPerfil._id}/siguiendo`);

    //  const { data: seguidos } = await Axios.get(`http://localhost:3000/api/amistades/${usuarioDueñoDelPerfil._id}/siguiendo`);
      console.log(seguidos); 
      setSeguidos(seguidos);
      setShowModal(true);
    } catch (error) {
      mostrarError('Ocurrió un error al obtener los seguidores del usuario.');
    }
  }



  async function obtenerSeguidores() {
    try {
      
      const { data: seguidores } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/amistades/${usuarioDueñoDelPerfil._id}/seguidores`);

    //  const { data: seguidores } = await Axios.get(`http://localhost:3000/api/amistades/${usuarioDueñoDelPerfil._id}/seguidores`);
      console.log(seguidores); 
      setSeguidores(seguidores);
      setShowModall(true);
    } catch (error) {
      mostrarError('Ocurrió un error al obtener los seguidores del usuario.');
    }
  }

  



  function esElPerfilDeLaPersonaLogin() {
    return usuario._id === usuarioDueñoDelPerfil._id;
  }

  // async function handleImagenSeleccionada(event) {
  //   try {
  //     setSubiendoImagen(true);
  //     const file = event.target.files[0];
  //     const config = {
  //       headers: {
  //         'Content-Type': file.type
  //       }
  //     };
  //     const { data } = await Axios.post('/api/usuarios/upload', file, config);
  //     setUsuarioDueñoDelPerfil({ ...usuarioDueñoDelPerfil, imagen: data.url });
  //     setSubiendoImagen(false);
  //   } catch (error) {
  //     mostrarError(error.response.data);
  //     setSubiendoImagen(false);
  //     console.log(error);
  //   }
  // }

  const handleImagenSeleccionada = async (e) => {
    e.preventDefault();
  
    const selectedFile = e.target.files[0];
  
    if (!selectedFile) {
      alert('Debes seleccionar un archivo.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await fetch('/api/usuarios/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.status === 200) {
        alert('Imagen subida exitosamente.');
      } else {
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

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
  if (cargandoPerfil) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (perfilNoExiste) {
    return (
      <RecursoNoExiste mensaje="El perfil que estas intentando ver no existe" />
    );
  }
  if (usuario == null) { 
    return null;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalTwo = () => {
    setShowModall(false);
  };


 
  

  return (
    <Main>
      <div className="Perfil">
      <ImagenAvatar
          esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin()}
          usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
          handleImagenSeleccionada={handleImagenSeleccionada}
          subiendoImagen={subiendoImagen}
        /> 

        <div className="Perfil__bio-container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{usuarioDueñoDelPerfil.username}</h2>
            {!esElPerfilDeLaPersonaLogin() && (
              <BotonSeguir
                siguiendo={usuarioDueñoDelPerfil.siguiendo}
                toggleSiguiendo={onToggleSiguiendo}
              />
            )}
            {esElPerfilDeLaPersonaLogin() && 
           <>
           <button className="editar-button" onClick={habilitarEdicion}>
        Editar
      </button>
            <BotonLogout logout={logout} />
            </>}
          </div>
          {!esMobil && (
            <DescripcionPerfil
              usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
              mostrarSeguidores={mostrarSeguidores}
              obtenerSeguidos={obtenerSeguidos}
              seguidos={seguidos}
              obtenerSeguidores={obtenerSeguidores}
              seguidores={seguidores}


            />
          )}
        </div>
      </div>
      {esMobil && (
        <DescripcionPerfil
          usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
          mostrarSeguidores={mostrarSeguidores}
          obtenerSeguidos={obtenerSeguidos}
          seguidos={seguidos}
          obtenerSeguidores={obtenerSeguidores}
          seguidores={seguidores}

        />
      )}
      <div className="Perfil__separador" />
      {posts.length > 0 ? (
        <Grid
          usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
          esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin()}
          posts={posts}
        />
      ) : (
        <NoHaPosteadoFotos />
      )}

      
     {showModal && (
        <>
           <ModalFollowing 
             toggleSiguiendo={toggleSiguiendo} 
             visible={showModal} 
             seguidos={seguidos} 
             onClose={handleCloseModal} 
             usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
             esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin}
             BotonSeguir={BotonSeguir}
             usuarios={usuarios} 
 

             />
        </>
      )}


    {showModall && (
        <>
           <ModalFollowers
             toggleSiguiendo={toggleSiguiendo}
             visible={showModall}
             seguidores={seguidores}
             onClosee={handleCloseModalTwo}
             usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
             esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin}
             BotonSeguir={BotonSeguir}
             usuarios={usuarios}
             usuario={usuario}

           />
        </>
      )}  



    </Main>
  );
}









function DescripcionPerfil({ usuarioDueñoDelPerfil, mostrarSeguidores, obtenerSeguidos, obtenerSeguidores }) {
  return (
    <div className="Perfil__descripcion">
      <h2 className="Perfil__nombre">{usuarioDueñoDelPerfil.nombre}</h2>
      <p>{usuarioDueñoDelPerfil.bio}</p>
      <p className="Perfil__estadisticas" >
        <b onClick={obtenerSeguidos}>{usuarioDueñoDelPerfil.numSiguiendo}</b> following
        <span className="ml-4"  >
          <b onClick={obtenerSeguidores}>{usuarioDueñoDelPerfil.numSeguidores}</b> followers
        </span>
      </p>
      
      {mostrarSeguidores && (
        <SeguidoresLista seguidores={usuarioDueñoDelPerfil.seguidores} />
      )}
    </div>
  );
}

function SeguidoresLista({ seguidores }) {
  return (
    <ul>
      {seguidores.map((seguidor, index) => (
        <li key={index}>{seguidor}</li>
      ))}
    </ul>
  );
}

function ImagenAvatar({
  esElPerfilDeLaPersonaLogin,
  usuarioDueñoDelPerfil,
  handleImagenSeleccionada,
  subiendoImagen
}) {
  let contenido;
  if (subiendoImagen) {
    contenido = <Loading />;
  } else if (esElPerfilDeLaPersonaLogin) {
    contenido = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: usuarioDueñoDelPerfil.imagen
            ? `url(${usuarioDueñoDelPerfil.imagen})`
            : null,
          backgroundColor: stringToColor(usuarioDueñoDelPerfil.username)
        }}
      >
        <input
          type="file"
          onChange={handleImagenSeleccionada}
          className="hidden"
          name="imagen"
        />
      </label>
    );
  } else {
    contenido = (
      <div
        className="Perfil__img-placeholder"
        style={{
          backgroundImage: usuarioDueñoDelPerfil.imagen
            ? `url(${usuarioDueñoDelPerfil.imagen})`
            : null,
          backgroundColor: stringToColor(usuarioDueñoDelPerfil.username)
        }}
      />
    );
  }
  return <div className="Perfil__img-container">{contenido}</div>;
}



function BotonSeguir({ siguiendo, toggleSiguiendo }) {
  return (
    <button onClick={toggleSiguiendo} className="Perfil__boton-seguir">
      {siguiendo ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
}

function BotonLogout({ logout }) {
  return (
    <button className="Perfil__boton-logout" onClick={logout}>
      Logout
    </button>
  );
}

function NoHaPosteadoFotos() {
  return <p className="text-center">Este usuario no ha posteado fotos.</p>;
}