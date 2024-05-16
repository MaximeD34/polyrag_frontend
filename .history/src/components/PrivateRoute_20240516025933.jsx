import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PrivateRoute useEffect");
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000s", {
          withCredentials: true,
        });
        console.log(response);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error); // Log the error
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Don't render children until the authentication check is complete
  if (isAuthenticated === null) {
    return null;
  }

  return children;
}

export default PrivateRoute;
