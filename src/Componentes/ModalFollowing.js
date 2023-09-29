import React from 'react';
import { Modal } from 'antd';
import toggleSiguiendo from '../Helpers/amistad-helpers';
import { Link } from 'react-router-dom';
import Avatar from '../Componentes/Avatar';

const ModalFollowing = ({visible, seguidos = [], onClose, BotonSeguir, toggleSiguiendo, usuarioDueñoDelPerfil, esElPerfilDeLaPersonaLogin }) => {

  
  return (

    <Modal
       title="Siguiendo"
       visible={visible}
       onCancel={onClose}
       footer={null}
       toggleSiguiendo={toggleSiguiendo}
       usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
  >

   {seguidos.map((item, index) => (
      <div key={index}>
      

      <Link to={`/perfil/${item}`} key={item}>
            <Avatar usuario={{ username: item }}  />
      </Link>
        {!esElPerfilDeLaPersonaLogin() && (
          <BotonSeguir toggleSiguiendo={toggleSiguiendo} siguiendo={usuarioDueñoDelPerfil.siguiendo} />
        )}
      </div>
    ))}
  
  </Modal>
  );
};


function BotonSeguir({ siguiendo, toggleSiguiendo }) {
  return (
    <button onClick={toggleSiguiendo} className="Perfil__boton-seguir">
      {siguiendo ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
}


 

export default ModalFollowing;