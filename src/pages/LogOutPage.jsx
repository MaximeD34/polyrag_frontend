import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../../config.js";

const LogOutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
      } catch (error) {
        console.error(error); // Log the error
        navigate("/login"); // Navigate to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            You have been logged out
          </h3>
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
          >
            Go to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default LogOutPage;
