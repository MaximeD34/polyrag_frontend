import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";
import TabsLayout from "../layouts/TabsLayout.jsx";
import Loading from "../components/Loading.jsx";
import Header from "../layouts/Header.jsx";

import Cookies from "js-cookie";

function Dashboard() {
  const [data_user, setData_user] = useState(null);
  const navigate = useNavigate();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(`${API_BASE_URL}/user_infos`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
        setData_user(response.data);
      } catch (error) {
        console.error(error); // Log the error
        navigate("/login"); // Navigate to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  if (!data_user) {
    return <Loading />;
  }

  const { email, username } = data_user;

  return (
    <div>
      <Header
        username={username}
        avatarMenuOpen={avatarMenuOpen}
        setAvatarMenuOpen={setAvatarMenuOpen}
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
