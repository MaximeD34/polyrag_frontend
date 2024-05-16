import { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ component: Component, path, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(path, { withCredentials: true });
        setIsAuthenticated(true);
        setData(response.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [path]);

  if (isAuthenticated === null) {
    // You can render a loading spinner or something similar here
    return null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          Auth
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
}

export default PrivateRoute;