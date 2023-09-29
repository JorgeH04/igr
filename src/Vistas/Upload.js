// import React, { useState } from 'react';
// import Main from '../Componentes/Main';
// import axios from 'axios'; // Importa Axios

// function Upload({ history, mostrarError }) {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       alert('Debes seleccionar un archivo.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('files', selectedFile);

//     try {
//       const response = await axios.post('http://localhost:3000/api/posts/newupload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//          }
//       });

//       if (response.status === 200) {
//         alert('Imagen subida exitosamente.');
//         // Aquí puedes hacer algo después de que la imagen se haya subido con éxito
//       } else {
//         alert('Error al subir la imagen.');
//       }
//     } catch (error) {
//       console.error('Error al subir la imagen:', error);
//     }
//   };

//   return (
//     <div>
//       <Main center>
//         <h3>Agrega una nueva vivienda</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="fileInput">Elegir imagen:</label>
//             <input
//               type="file"
//               name="files"
//               id="fileInput"
//               accept=".jpg, .jpeg, .png" // Limita los tipos de archivo permitidos
//               onChange={handleFileChange}
//             />
//           </div>

//           <button type="submit">Subir Imagen</button>
//         </form>
//       </Main>
//     </div>
//   );
// }

// export default Upload;











import React, { useState } from 'react';
import Main from '../Componentes/Main';
import axios from 'axios'; 

function Upload({ history, mostrarError }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Debes seleccionar un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      /const response = await axios.post('https://igback-ec39561a3d0d.herokuapp.com/api/posts/newupload', formData, {
      //  const response = await axios.post('http://localhost:3000/api/posts/newupload', formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
         }
      });

      if (response.status === 200) {
        alert('Imagen subida exitosamente.');
        // Aquí puedes hacer algo después de que la imagen se haya subido con éxito
      } else {
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div>
      <Main center>
        <h3>Agrega una nueva vivienda</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fileInput">Elegir imagen:</label>
            <input
              type="file"
              name="files"
              id="fileInput"
              accept=".jpg, .jpeg, .png" // Limita los tipos de archivo permitidos
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Subir Imagen</button>
        </form>
      </Main>
    </div>
  );
}

export default Upload;














// import React, { useState } from 'react';
// import Main from '../Componentes/Main';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import Loading from '../Componentes/Loading';
// import Axios from 'axios';

// export default function Upload({ history, mostrarError }) {
//   const [imagenUrl, setImagenUrl] = useState('');
//   const [subiendoImagen, setSubiendoImagen] = useState(false);
//   const [enviandoPost, setEnviandoPost] = useState(false);
//   const [caption, setCaption] = useState('');



//   async function handleImagenSeleccionada(evento) {
//     try {
//       setSubiendoImagen(true);
//       const file = evento.target.files[0];
//       const config = {
//         headers: {
//           'Content-Type': file.type
//         }
//       };
//       const { data } = await Axios.post('/api/posts/upload', file, config);
//       setImagenUrl(data.url);
//       setSubiendoImagen(false);
//     } catch (error) {
//       setSubiendoImagen(false);
//       mostrarError(error.response.data);
//       console.log(error);
//     }
//   }
  

//   async function handleSubmit(evento) {
//     evento.preventDefault();
//     if (enviandoPost) {
//       return;
//     }
//     if (subiendoImagen) {
//       mostrarError('No se ha terminado de subir la imagen');
//       return;
//     }
//     if (!imagenUrl) {
//       mostrarError('Primero selecciona una imagen');
//       return;
//     }
//     try {
//       setEnviandoPost(true);
//       const body = {
//         caption,
//         url: imagenUrl
//       };
//       await Axios.post('/api/posts', body);
//       setEnviandoPost(false);
//       history.push('/');
//     } catch (error) {
//       mostrarError(error.response.data);
//     }
//   }
//   return (
//     <Main center>
//       <div className="Upload">
//         <form onSubmit={handleSubmit}>
//           <div className="Upload__image-section">
//             <SeccionSubirImagen
//               imagenUrl={imagenUrl}
//               subiendoImagen={subiendoImagen}
//               handleImagenSeleccionada={handleImagenSeleccionada}
//             />
//           </div>
//           <textarea 
//             name="caption"
//             className="Upload__caption"
//             required
//             maxLength="180"
//             placeholder="Caption de tu post."
//             value={caption}
//             onChange={e => setCaption(e.target.value)}
//           />
//           <button className="Upload__submit" type="submit">
//             Post
//           </button>
//         </form>
//       </div>
//     </Main>
//   );
// }



// function SeccionSubirImagen({
//   subiendoImagen,
//   imagenUrl,
//   handleImagenSeleccionada
// }) {
//   if (subiendoImagen) {
//     return <Loading />;
//   } else if (imagenUrl) {
//     return <img src={imagenUrl} alt="" />;
//   } else {
//     return (
//       <label className="Upload__image-label">
//         <FontAwesomeIcon icon={faUpload} />
//         <span>Publica una foto</span>
//         <input
//           type="file"
//           className="hidden"
//           name="imagen"
//           onChange={handleImagenSeleccionada}
//         />
//       </label>
//     );
//   }
// }


