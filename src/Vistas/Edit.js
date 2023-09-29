import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarUsuario = () => {
  const [usuario, setUsuario] = useState({});
  const [nuevosDatos, setNuevosDatos] = useState({
    username: '',
    password: '',
    email: '',
    nombre: '',
    imagen: '',
    bio: ''
  });

  useEffect(() => {
    cargarUsuario(); // Cargar el usuario actual al montar el componente
  }, []);

  const cargarUsuario = async () => {
    try {
      const response = await axios.get('/api/usuarios/whoami'); // Obtener los datos del usuario actual
      setUsuario(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNuevosDatos({ ...nuevosDatos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/usuarios/${usuario._id}`, nuevosDatos); // Enviar los nuevos datos del usuario al backend para editarlos
      cargarUsuario(); // Volver a cargar los datos del usuario después de la edición exitosa
      setNuevosDatos({
        username: '',
        password: '',
        email: '',
        nombre: '',
        imagen: '',
        bio: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      {usuario && (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={nuevosDatos.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={nuevosDatos.password} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={nuevosDatos.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Nombre:
            <input type="text" name="nombre" value={nuevosDatos.nombre} onChange={handleChange} />
          </label>
          <br />
          <label>
            Imagen:
            <input type="text" name="imagen" value={nuevosDatos.imagen} onChange={handleChange} />
          </label>
          <br />
          <label>
            Bio:
            <textarea name="bio" value={nuevosDatos.bio} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Guardar cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditarUsuario;