import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LoginView } from './views/Login';
import { SetupView } from './views/Setup';
import { SetupRatesView } from './views/SetupRates';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <LoginView />
      </Route>

      <Route path="/setup">
        <SetupView />
      </Route>

      <Route path="/setup-rates">
        <SetupRatesView />
      </Route>

      <Route path="*">
        <LoginView />
      </Route>
    </Switch>
  </BrowserRouter>
);
