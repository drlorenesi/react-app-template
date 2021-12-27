import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({
  access,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        access ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
}
