import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";
import Header from "../layouts/Header.jsx";
import Loading from "../components/Loading.jsx";
import axios from "axios";
import Cookies from "js-cookie";

function AdminAnalytics() {
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [data_user, setData_user] = useState(null);
  const [count, setCount] = useState(null);

  const navigate = useNavigate();

  //to get user info
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const csrfToken = Cookies.get("csrf_access_token");

        if (!csrfToken) {
          setShouldRedirect(true);
          return;
        }

        const response1 = await axios.get(`${API_BASE_URL}/user_infos`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
        setData_user(response1.data);
      } catch (error) {
        console.error(error); // Log the error

        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");

          if (csrfRefreshToken) {
            try {
     
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
      

                const response3 = await axios.get(
                  `${API_BASE_URL}/user_infos`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setData_user(response3.data);
              }
            } catch (error) {
              console.error(error); // Log the error
              // If the error is due to other reasons, we just throw it back to axios
              setShouldRedirect(true);
            }
          }
        } else {
          // If the error is due to other reasons, we just throw it back to axios
          setShouldRedirect(true);
        }
      }
    };

    checkAuth();
  }, []);

  function refreshCounts() {
    const checkAuth = async () => {
      try {
        const csrfToken = Cookies.get("csrf_access_token");

        if (!csrfToken) {
          setShouldRedirect(true);
          return;
        }

        const response1 = await axios.get(`${API_BASE_URL}/all_analytics`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
        setCount(response1.data);
      } catch (error) {
        console.error(error); // Log the error

        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");

          if (csrfRefreshToken) {
            try {
        
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {

                const response3 = await axios.get(
                  `${API_BASE_URL}/all_analytics`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setCount(response3.data);
              }
            } catch (error) {
              console.error(error); // Log the error
              // If the error is due to other reasons, we just throw it back to axios
              setShouldRedirect(true);
            }
          }
        } else {
          // If the error is due to other reasons, we just throw it back to axios
          setShouldRedirect(true);
        }
      }
    };

    checkAuth();
  }

  //to get the queries
  useEffect(() => {
    refreshCounts();
  }, []);

  //refresh the queries every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshCounts();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login");
    }
  }, [shouldRedirect, navigate]);

  if (!data_user || !count) {
    return <Loading />;
  }

  const { email, username, is_admin } = data_user;

  return (
    <>
      <Header
        username={username}
        avatarMenuOpen={avatarMenuOpen}
        setAvatarMenuOpen={setAvatarMenuOpen}
        is_admin={is_admin}
      />

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-7 mb-12">
        {/* check all the props and show a loading spinner if any is undefined */}

        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Welcome to the global analytics
            </h3>
            <p className="text-gray-600 mt-2">
              These are the analytics of all users
            </p>
          </div>
        </div>

        <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6 flex ">Username</th>
                <th className="py-3 px-6">Number of queries</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {count
                .sort((a, b) => b.nb_queries - a.nb_queries)
                .map((item, idx) => (
                  <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item.nb_queries}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminAnalytics;
