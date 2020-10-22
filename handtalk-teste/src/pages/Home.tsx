import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/home.css';
import logoImg from '../assets/Autism.png';

const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <header>
        <img src={logoImg} alt="Simbolo do Autismo" />

        <main>
          <h1>
            Aprenda sobre autismo com especialistas e pais experientes no
            assunto
          </h1>
          <p>Ajude os pais de crianças autistas a entenderem seus filhos.</p>
        </main>
      </header>
      <div className="btn-container">
        <Link to="/login" id="btn-login">
          <span>Login</span>
        </Link>
        <Link to="/registro" id="btn-registro">
          <span>Registro</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
