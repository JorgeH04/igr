// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Axios from 'axios';
// import Main from '../Componentes/Main';
// import Loading from '../Componentes/Loading';
// import Post from '../Componentes/Post';


// async function cargarPosts(fechaDelUltimoPost) {
//   const query = fechaDelUltimoPost ? `?fecha=${fechaDelUltimoPost}` : '';
//   const { data: nuevosPosts } = await Axios.get(`/api/posts/feed${query}`);
//   return nuevosPosts;
// }


// const NUMERO_DE_POSTS_POR_LLAMADA = 3;
// export default function Feed({ mostrarError  }) {
 
 
//   const [posts, setPosts] = useState([]);
//   const [cargandoPostIniciales, setCargandoPostIniciales] = useState(true);
//   const [cargandoMasPosts, setCargandoMasPosts] = useState(false);
//   const [todosLosPostsCargados, setTodosLosPostsCargados] = useState(false);
//   const [page, setPage] = useState('0');

 



//   useEffect(() => {
//     async function cargarPostsIniciales() {
//       try {
//         const nuevosPosts = await cargarPosts();
//         setPosts(nuevosPosts);
//         console.log(nuevosPosts);
//         setCargandoPostIniciales(false);
//         revisarSiHayMasPosts(nuevosPosts);
//       } catch (error) {
//         mostrarError('Hubo un problema cargando tu feed.');
//         console.log(error);
//       }
//     }
//     cargarPostsIniciales();
//   }, []);


//   useEffect(() => {
//     setTimeout(async () => {
//         const response = await axios.get(
//             `https://api.themoviedb.org/3/search/movie?api_key=e0b76ea37ca9d64aaa29d485cd5395e6&query=${searchMovie}&page=${page}`
//         );

//         setMovies((prev) => {
//             return [...prev, ...response.data.results];
//         });
//      }, 1500);
// }, [page]);



//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
  
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
  
  
//   const handleScroll = async () => {
//     if (
//         window.innerHeight + document.documentElement.scrollTop + 1 >=
//         document.documentElement.scrollHeight
//     ) {
//          setPage((prev) => prev + 1);
//     }
//   };


//   function actualizarPost(postOriginal, postActualizado) {
//     setPosts(posts => {
//       const postsActualizados = posts.map(post => {
//         if (post !== postOriginal) {
//           return post;
//         }
//         return postActualizado;
//       });
//       return postsActualizados;
//     });
//   }


//   async function cargarMasPosts() {
//     if (cargandoMasPosts) {
//       return;
//     }
//     try {
//       setCargandoMasPosts(true);
//       const fechaDelUltimoPost = posts[posts.length - 1].fecha_creado;
//       const nuevosPosts = await cargarPosts(fechaDelUltimoPost);
//       setPosts(viejosPosts => [...viejosPosts, ...nuevosPosts]);
//       setCargandoMasPosts(false);
//       revisarSiHayMasPosts(nuevosPosts);
//     } catch (error) {
//       mostrarError('Hubo un problema cargando los siguientes posts.');
//       setCargandoMasPosts(false);
//     }
//   }



//   function revisarSiHayMasPosts(nuevosPosts) {
//     if (nuevosPosts.length < NUMERO_DE_POSTS_POR_LLAMADA) {
//       setTodosLosPostsCargados(true);
//     }
//   }



//   if (cargandoPostIniciales) {
//     return (
//       <Main center>
//         <Loading />
//       </Main>
//     );
//   }
//   if (!cargandoPostIniciales && posts.length === 0) {
//     return (
//       <Main center>
//         <NoSiguesANadie />
//       </Main>
//     );
//   }
//   return (
//     <Main center>
//       <div className="Feed">
//         {posts.map(post => (
//           <Post
//             key={post._id}
//             post={post}
//             actualizarPost={actualizarPost}
//             mostrarError={mostrarError}
//             //usuario={usuario}
//           />
//         ))}
//         <CargarMasPosts
//           onClick={cargarMasPosts}
//           todosLosPostsCargados={todosLosPostsCargados}
//         />
//       </div>
//     </Main>
//   );
// }
// function NoSiguesANadie() {
//   return (
//     <div className="NoSiguesANadie">
//       <p className="NoSiguesANadie__mensaje">
//         Tu feed no tiene fotos porque no sigues a nadie, o porque no han
//         publicado fotos.
//       </p>
//       <div className="text-center">
//         <Link to="/explore" className="NoSiguesANadie__boton">
//           Explora Clontagram
//         </Link>
//       </div>
//     </div>
//   );
// }
// function CargarMasPosts({ onClick, todosLosPostsCargados }) {
//   if (todosLosPostsCargados) {
//     return <div className="Feed__no-hay-mas-posts">No hay más posts</div>;
//   }
//   return (
//     <button className="Feed__cargar-mas" onClick={onClick}>
//       Ver más
//     </button>
//   );
// }








import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Post from '../Componentes/Post';

async function cargarPosts(fechaDelUltimoPost) {
  const query = fechaDelUltimoPost ? `?fecha=${fechaDelUltimoPost}` : '';
  
  const { data: nuevosPosts } = await Axios.get(`https://igback-ec39561a3d0d.herokuapp.com/api/posts/feed${query}`);

//  const { data: nuevosPosts } = await Axios.get(`/api/posts/feed${query}`);
  return nuevosPosts;
}

 
export default function Feed({ mostrarError, usuario }) {
  const [posts, setPosts] = useState([]);
  const [cargandoPostIniciales, setCargandoPostIniciales] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

 

  useEffect(() => {
    async function cargarPostsIniciales() {
      try {
         const nuevosPosts = await cargarPosts();
         setPosts(nuevosPosts);
        setCargandoPostIniciales(false);
       } catch (error) {
        mostrarError('Hubo un problema cargando tu feed.');
        console.log(error);
      }
    }
    cargarPostsIniciales();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function cargarMasPosts() {
      if (isLoading) {
        return;
      }
      try {
        setIsLoading(true);
        const fechaDelUltimoPost = posts[posts.length - 1].fecha_creado;
        const nuevosPosts = await cargarPosts(fechaDelUltimoPost);
        setPosts(viejosPosts => [...viejosPosts, ...nuevosPosts]);
        setIsLoading(false);
       } catch (error) {
    //    mostrarError('Hubo un problema cargando los siguientes posts.');
        setIsLoading(false);
      }
    }
    cargarMasPosts();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };


  function actualizarPost(postOriginal, postActualizado) {
    setPosts(posts => {
      const postsActualizados = posts.map(post => {
        if (post !== postOriginal) {
          return post;
        }
        return postActualizado;
      });
      return postsActualizados;
    });
  }

 
  if (cargandoPostIniciales) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (!cargandoPostIniciales && posts.length === 0) {
    return (
      <Main center>
        <NoSiguesANadie />
      </Main>
    );          
  }
  return (
    <Main center>
      <div className="Feed">
        {posts.map(post => (
          <Post
            key={post._id}
            post={post}
            mostrarError={mostrarError}
            usuario={usuario}
            actualizarPost={actualizarPost}

           />
        ))}
    
      </div>
    </Main>
  );
}

function NoSiguesANadie() {
  return (
    <div className="NoSiguesANadie">
      <p className="NoSiguesANadie__mensaje">
        Tu feed no tiene fotos porque no sigues a nadie, o porque no han publicado fotos.
      </p>
      <div className="text-center">
        <Link to="/explore" className="NoSiguesANadie__boton">
          Explora Clontagram
        </Link>
      </div>
    </div>
  );
}
