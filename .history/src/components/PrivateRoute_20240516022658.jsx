import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = // Add your authentication check logic here

  return (
    <Route
      render={props =>
        isAuthenticated ? (
          auth
        ) : (
          <Navigate to="/login" />
        )
      }
    />
    test
  );
}