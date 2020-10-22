import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../firebase/config';

import '../styles/pages/login.css';

import backImg from '../assets/arrow-left.png';

const Registro: React.FC = () => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerNewUser(
    e: FormEvent,
    userName: string,
    userEmail: string,
    userPassword: string,
  ) {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(cred => {
        db.collection('users').doc(cred.user?.uid).set({
          nome: userName,
        });
        alert('Usuário cadastrado com sucesso');
        history.push('/');
      })
      .catch(err => {
        alert('Erro ao cadastrar usuário');

        console.error(err);
      });
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={e => registerNewUser(e, name, email, password)}>
        <h1>Registro</h1>

        <Link to="/" id="back-to-home">
          <img src={backImg} alt="Voltar" />
        </Link>
        <fieldset>
          <label htmlFor="name">Nome</label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </fieldset>

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

        <Link to="/login">Já é cadastrado ?</Link>
        <button type="submit">Registro</button>
      </form>
    </div>
  );
};

export default Registro;
