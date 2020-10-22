import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../firebase/config';
import 'firebase/functions';

import '../styles/pages/dashboard.css';
import avatarImg from '../assets/avatar.png';
import Post from '../components/Post';
import { isContext } from 'vm';

const Dashboard: React.FC = () => {
  const history = useHistory();


  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();

  const currentLoggedUser = auth.currentUser;

  const [posts, setPosts] = useState<firebase.firestore.DocumentData[]>([]);
  const [userName, setUserName] = useState('');
  const [userToAdminEmail, setUserToAdminEmail] = useState('');
  const [admin, setAdmin] = useState(false);

  function userLogout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    auth.signOut();

    history.push('/');
  }

  function newPost(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    history.push('/newpost');
  }

  function makeAdmin(e: FormEvent, email: string) {
    e.preventDefault();

    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email }).then((result) => {
      console.log(result)
    }).catch(err => {
      alert('Não foi possível executar essa operação');
      console.log(err.message);
    });

  }

  useEffect(() => {
    if (currentLoggedUser) {

      currentLoggedUser.getIdTokenResult().then(idTokenResult => {
        setAdmin(idTokenResult.claims.admin);
      });

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

    db.collection('posts')
      .get()
      .then(docs => {
        const arr: firebase.firestore.DocumentData[] = [];
        docs.forEach(doc => {
          arr.push(doc.data());
        });
        setPosts(arr);
      });
  }, [currentLoggedUser]);

  return (
    <div className="dashboard-wrapper">
      {currentLoggedUser ? (
        <div className="logged-user">
          <header>
            <h3>
              Bem vindo(a),
              {` ${userName}`}
            </h3>
            <img src={avatarImg} alt="" />
            <div className="btn-links">
              {admin && (
                <button type="button" onClick={e => newPost(e)}>
                  criar post
                </button>
              )}
              <button
                type="button"
                id="btn-logout"
                onClick={e => userLogout(e)}
              >
                logout
              </button>
            </div>
          </header>
          {admin && (
            <div className="make-admin">
              <form onSubmit={e => makeAdmin(e, userToAdminEmail)}>
                <label htmlFor="email">Adicionar administrador</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email do usuário"
                  value={userToAdminEmail}
                  onChange={e => setUserToAdminEmail(e.target.value)}
                />
                <button type="submit">Adicionar</button>
              </form>
            </div>
          )}
          <main>
            {posts.map(post => (
              <Post
                key={post.titulo}
                author={post?.autor || `Anônimo`}
                title={post.titulo}
                content={post.conteudo}
              />
            ))}
          </main>
        </div>
      ) : (
          <div className="wrapper">
            <h3>Faça login para visualizar as postagens</h3>
            <div className="btn-container">
              <Link to="/login" id="btn-login">
                <span>Login</span>
              </Link>

              <Link to="/registro" id="btn-registro">
                <span>Registro</span>
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
