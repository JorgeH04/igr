import React from 'react';
import { Modal, Button  } from 'antd';
import Avatar from '../Componentes/Avatar';
import BotonSeguir from '../Componentes/BotonSeguir';

import { Link } from 'react-router-dom';
import toggleSiguiendo from '../Helpers/amistad-helpers';


const LikesModal = ({ visible, likes = [], onClose , usuario}) => {
  return (
    <Modal
      title="Likes de la imagen"
      visible={visible}
      onCancel={onClose}
      footer={null}
      usuario={usuario}
    >
      {likes.map((item, index) => (       
        <div className="like-item" key={index}>
         
            <Link to={`/perfil/${item}`} key={item}>
                <Avatar usuario={{ username: item }}  />
            </Link>
             <BotonSeguir usuario={usuario} />
            {/* <Button type="primary" className="friend-button">
            Agregar amigo
          </Button> */}
       </div>
      ))}
    </Modal>
  );
};



 
export default LikesModal;