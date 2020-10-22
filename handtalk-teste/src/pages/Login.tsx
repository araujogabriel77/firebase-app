import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../firebase/config';

import '../styles/pages/login.css';

import backImg from '../assets/arrow-left.png';

const Login: React.FC = () => {
  const auth = firebase.auth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function userLogin(e: FormEvent, userEmail: string, userPassword: string) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        alert('Logado com sucesso');

        history.push('/dashboard');
      })
      .catch(err => {
        alert('Erro ao logar');

        console.error(err);
      });
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={e => userLogin(e, email, password)}>
        <h1>Login</h1>
        <Link to="/" id="back-to-home">
          <img src={backImg} alt="Voltar" />
        </Link>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>

        <Link to="/registro">Ainda não tem uma conta ?</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
