import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // If the request succeeds, we don't have to do anything and just return the response

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the server returns a 401 error (Unauthorized) and the user hasn't been logged out yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      // Try to refresh the token
      const csrfToken = Cookies.get("csrf_refresh_token");
  
      if (csrfToken) {
        try {
          
          const response = await axios.post(`${API_BASE_URL}/refresh`, {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          });

          // If the refresh token is valid, we update the token in the cookies
          if (response.status === 200) {
            Cookies.set("csrf_access_token", response.data.csrf_access_token, {
              sameSite: "strict",
            });
            Cookies.set(
              "csrf_refresh_token",
              response.data.csrf_refresh_token,
              {
                sameSite: "strict",
              }
            );

            // And we retry the original request
            originalRequest.headers["X-CSRF-TOKEN"] =
              response.data.csrf_access_token;
            return api(originalRequest);
          }
        } catch (error) {
          console.error(error); // Log the error
          // If the error is due to other reasons, we just throw it back to axios
          return Promise.reject(error);
        }
      }
    }

    // If the error is due to other reasons, or the refresh token is invalid, we just throw it back to axios
    return Promise.reject(error);
  }
);

export default api;
