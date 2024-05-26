import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";
import TabsLayout from "../layouts/TabsLayout.jsx";
import Loading from "../components/Loading.jsx";
import Header from "../layouts/Header.jsx";
import axios from "axios";

import Cookies from "js-cookie";

function Dashboard() {
  const [data_user, setData_user] = useState(null);
  const navigate = useNavigate();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login");
    }
  }, [shouldRedirect, navigate]);

  if (!data_user) {
    return <Loading />;
  }

  const { email, username, is_admin } = data_user;

  return (
    <div>
      <Header
        username={username}
        avatarMenuOpen={avatarMenuOpen}
        setAvatarMenuOpen={setAvatarMenuOpen}
        is_admin={is_admin}
      />
      <TabsLayout
        email={email}
        username={username}
        avatarMenuOpen={avatarMenuOpen}
      />
    </div>
  );
}

export default Dashboard;
