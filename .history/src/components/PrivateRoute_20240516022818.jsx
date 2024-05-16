import { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ component: Component}) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Replace '/check-auth' with the endpoint in your Flask API that checks if a user is authenticated
        const response = await axios.get('/check-auth', { withCredentials: true });

        setIsAuthenticated(response.data.isAuthenticated);
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