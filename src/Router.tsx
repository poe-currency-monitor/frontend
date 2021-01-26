import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LoginView } from './views/login';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <LoginView />
      </Route>

      <Route path="*">
        <LoginView />
      </Route>
    </Switch>
  </BrowserRouter>
);
