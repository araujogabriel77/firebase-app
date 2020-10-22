import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NewPost from '../pages/NewPost';
import Registro from '../pages/Registro';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/newpost" component={NewPost} />
    </Switch>
  );
};

export default Routes;
