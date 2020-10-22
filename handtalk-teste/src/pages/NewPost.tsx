import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../firebase/config';

import '../styles/pages/newpost.css';

import backImg from '../assets/arrow-left.png';

const NewPost: React.FC = () => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');

  const currentLoggedUser = auth.currentUser;

  function createPost(e: FormEvent, postTitle: string, postContent: string) {
    e.preventDefault();

    if (!postTitle || !postContent) {
      console.log('erro');
      return;
    }
    db.collection('posts')
      .add({
        autor: userName,
        titulo: title,
        conteudo: content,
      })
      .then(() => {
        history.push('/dashboard');
      })
      .catch(err => {
        alert('Falha ao criar post');
        console.log(err.message);
      });
  }

  useEffect(() => {
    if (currentLoggedUser) {
      const userId = currentLoggedUser.uid;
      db.collection('users')
        .doc(userId)
        .get()
        .then(doc => {
          setUserName(doc.data()?.nome);
        })
        .catch(err => {
          console.log(err.message);
        });
    }

  }, [currentLoggedUser])

  return (
    <div className="form-wrapper">
      {currentLoggedUser ? (
        <form onSubmit={e => createPost(e, title, content)}>
          <Link to="/dashboard" id="back-to-home">
            <img src={backImg} alt="Voltar" />
          </Link>
          <fieldset>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              name="title"
              id="post-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="content">Conteúdo</label>
            <textarea
              name="content"
              id="post-content"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </fieldset>
          <button type="submit">Criar</button>
        </form>
      ) : (
          <>
            <Link to="/dashboard" id="back-to-home">
              <img src={backImg} alt="Voltar" />
            </Link>
            <h1>você precisa estar logado</h1>
          </>
        )}
    </div>
  );
};

export default NewPost;
