import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface PostProps {
  title: string;
  content: string;
  author: string;
}

const Post: React.FC<PostProps> = ({ title, content, author }) => {
  return (
    <article className="post">
      <h3>{title}</h3>
      <div className="content-container">
        <p>{content}</p>
      </div>
      <span>Escrito por {author}</span>
    </article>
  );
};

export default Post;
