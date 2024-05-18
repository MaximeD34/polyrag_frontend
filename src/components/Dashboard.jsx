import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";
import TabsLayout from "../layouts/TabsLayout.jsx";

import Cookies from "js-cookie";

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      console.log("test");
      console.log(csrfToken);
      try {
        const response = await axios.get(`${API_BASE_URL}/user_infos`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error); // Log the error
        navigate("/login"); // Navigate to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TabsLayout />
    </div>
  );
}

export default Dashboard;
