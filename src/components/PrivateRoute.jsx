import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import api from "../logic/Axios";

import Cookies from "js-cookie";

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const csrfToken = Cookies.get("csrf_access_token");
        const response = await api.get(`${API_BASE_URL}/user_infos`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
      } catch (error) {
        console.error(error); // Log the error
        // If the error is due to other reasons, we just throw it back to axios
        if (!error.response || error.response.status !== 401) {
          //unknown error
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
}

export default PrivateRoute;
