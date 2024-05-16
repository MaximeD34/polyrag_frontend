import { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/userInfos', { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // You can render a loading spinner or something similar here
    return null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
}

export default PrivateRoute;