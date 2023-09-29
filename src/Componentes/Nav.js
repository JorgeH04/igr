import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons';


export default function Nav({ usuario }) {
  return (
    <nav className="Nav">
      <div className="Nav__container">
      <ul className="Nav__links">
        <li>
          <Link className="Nav__link" to="/">
            Clontagram
          </Link>
        </li>
        {usuario && <LoginRoutes usuario={usuario} />}
      </ul>
      </div>
    </nav>
  );
}



function LoginRoutes({ usuario }) {
  return (
    <>
      <li className="Nav__link-push">
        <Link className="Nav__link" to="/upload">
          <FontAwesomeIcon icon={faCameraRetro} />
          <span className="Nav__link-text">Upload</span>
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link className="Nav__link" to="/explore">
          <FontAwesomeIcon icon={faCompass} />
          <span className="Nav__link-text">Discover</span>
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link className="Nav__link" to={`/perfil/${usuario.username}`}>
          <FontAwesomeIcon icon={faUser} />
          <span className="Nav__link-text">Profile</span>
        </Link>
      </li>
    </>
  );
}