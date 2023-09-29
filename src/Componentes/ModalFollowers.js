import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { Link, useLocation  } from 'react-router-dom';
import Avatar from '../Componentes/Avatar';


const ModalFollowers = ({ visible, seguidores = [], onClosee, BotonSeguir, toggleSiguiendo, usuarioDueñoDelPerfil, esElPerfilDeLaPersonaLogin }) => {

  const location = useLocation();

  useEffect(() => {
    if (visible && !esElPerfilDeLaPersonaLogin) {
      onClosee();
    }
  }, [location, visible, esElPerfilDeLaPersonaLogin, onClosee]);


  return (
    <Modal
      title="Seguidores"
      visible={visible}
      onCancel={onClosee}
      footer={null}
      toggleSiguiendo={toggleSiguiendo}
      usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}

  >

   {seguidores.map((item, index) => (
      <div key={index}>
         
          <Link to={`/perfil/${item}`} key={item}>
            <Avatar usuario={{ username: item }}  />
          </Link>
          
      </div>
         ))}  
    </Modal>


  );
};


 


export default ModalFollowers;



// import React from 'react';
// import { Modal } from 'antd';
// import { Link } from 'react-router-dom';

// const ModalFollowers = ({ visible, seguidores = [], onClosee, BotonSeguir, toggleSiguiendo, usuarioDueñoDelPerfil, esElPerfilDeLaPersonaLogin }) => {
//   return (
//     <Modal
//       title="Seguidores"
//       visible={visible}
//       onCancel={onClosee}
//       footer={null}
//       toggleSiguiendo={toggleSiguiendo}
//       usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
//     >
//       {seguidores.map((item, index) => (
//         <div key={index}>
//           <Link to={`/perfil/${item}`} key={item}>
//             <p>{item}</p>
//           </Link>
//         </div>
//       ))}
//     </Modal>
//   );
// };

// export default ModalFollowers;