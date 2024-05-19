import { useState, useEffect, useRef } from "react";

import Header from "./Header";
import FilesSection from "./FilesSection";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

function TabsLayout({ email, username, avatarMenuOpen, setAvatarMenuOpen }) {
  // Replace javascript:void(0) paths with your paths
  // const navigation = [{ title: "Pro version", path: "javascript:void(0)" }];

  const submenuNav = [
    { title: "Query" },
    { title: "Files" },
    { title: "Community" },
  ];

  const navigate = useNavigate();

  const [data_files, setData_files] = useState(null);
  const [public_data_files, setPublic_data_files] = useState(null);

  //get private files
  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(`${API_BASE_URL}/user_files`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
        setData_files(response.data);
      } catch (error) {
        console.error(error); // Log the error
        navigate("/login"); // Navigate to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  //get private files
  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(`${API_BASE_URL}/all_public_files`, {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
        setPublic_data_files(response.data);
      } catch (error) {
        console.error(error); // Log the error
        navigate("/login"); // Navigate to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  const [selectedSubmenu, setSelectedSubmenu] = useState(submenuNav[0].title);
  const [selectedFileIds, setSelectedFileIds] = useState([]);

  console.log("selected files: ", selectedFileIds);
  console.log("data_files : ", data_files);
  console.log("public_data_files : ", public_data_files);

  return (
    <>
      <header className="text-base lg:text-sm">
        <nav className="border-b">
          <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
            {submenuNav.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`py-1 ${
                    selectedSubmenu === item.title
                      ? "border-b-2 border-indigo-600"
                      : ""
                  }`}
                >
                  <a
                    href="javascript:void(0)"
                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150"
                    onClick={() => setSelectedSubmenu(item.title)}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {selectedSubmenu === "Query" && <h1>Test1</h1>}
      {selectedSubmenu === "Files" && (
        <FilesSection
          fileList={data_files}
          selectedFileIds={selectedFileIds}
          setSelectedFileIds={setSelectedFileIds}
          isPublicMode={false}
          avatarMenuOpen={avatarMenuOpen}
        />
      )}
      {selectedSubmenu === "Community" && (
        <FilesSection
          fileList={public_data_files}
          selectedFileIds={selectedFileIds}
          setSelectedFileIds={setSelectedFileIds}
          isPublicMode={true}
          avatarMenuOpen={avatarMenuOpen}
        />
      )}
    </>
  );
}

export default TabsLayout;
