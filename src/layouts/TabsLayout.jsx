import FilesSection from "./FilesSection";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Query from "../layouts/Query";

function TabsLayout({ email, username, avatarMenuOpen, setAvatarMenuOpen }) {
  const submenuNav = [
    { title: "Query" },
    { title: "Files" },
    { title: "Community" },
  ];

  const navigate = useNavigate();

  const [private_data_files, setData_files] = useState(null);
  const [public_data_files, setPublic_data_files] = useState(null);
  const [private_files_init_status, setPrivate_files_init_status] =
    useState(null);
  const [public_files_init_status, setPublic_files_init_status] =
    useState(null);

  const [selectedSubmenu, setSelectedSubmenu] = useState(submenuNav[0].title);

  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [query, setQuery] = useState("");

  const [instructions, setInstructions] = useState("");

  const [isAnswered, setIsAnswered] = useState(false);
  const [isAsked, setIsAsked] = useState(false);
  const [answer, setAnswer] = useState("");

  const [retrieved_data_files, setRetrieved_data_files] = useState(null);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const refreshPrivateFiles = () => {
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
        // navigate("/login"); // Navigate to login page on error
      }
    };

    fetchData();
  };

  const refreshPublicFiles = () => {
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
        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");
          console.log("refresh token: ", csrfRefreshToken);
          console.log("refreshing token");
          if (csrfRefreshToken) {
            try {
              console.log("trying");
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
                console.log("succeeded");
                const data = await response2.json();
           

                // And we retry the original request
                const response3 = await axios.get(
                  `${API_BASE_URL}/user_infos`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setPublic_data_files(response3.data);
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

    fetchData();
  };

  const refreshPrivateFilesStatus = () => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/private_files_status`,
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
        setPrivate_files_init_status(response.data);
      } catch (error) {
        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");
          console.log("refresh token: ", csrfRefreshToken);
          console.log("refreshing token");
          if (csrfRefreshToken) {
            try {
              console.log("trying");
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
                console.log("succeeded");
                const data = await response2.json();
              

                // And we retry the original request
                const response3 = await axios.get(
                  `${API_BASE_URL}/user_infos`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setPrivate_files_init_status(response.data);
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
    fetchData();
  };

  const refreshPublicFilesStatus = () => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/public_files_status`,
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
        setPublic_files_init_status(response.data);
      } catch (error) {
        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");
          console.log("refresh token: ", csrfRefreshToken);
          console.log("refreshing token");
          if (csrfRefreshToken) {
            try {
              console.log("trying");
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
                console.log("succeeded");
                const data = await response2.json();
               
          

                // And we retry the original request
                const response3 = await axios.get(
                  `${API_BASE_URL}/public_files_status`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setPublic_files_init_status(response3.data);
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
    fetchData();
  };

  //get private files
  useEffect(() => {
    refreshPrivateFiles();
  }, [navigate]);

  //get public files
  useEffect(() => {
    refreshPublicFiles();
  }, [navigate]);

  //get public files
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
        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");
          console.log("refresh token: ", csrfRefreshToken);
          console.log("refreshing token");
          if (csrfRefreshToken) {
            try {
              console.log("trying");
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
                console.log("succeeded");
                const data = await response2.json();
           
     

                // And we retry the original request
                const response3 = await axios.get(
                  `${API_BASE_URL}/all_public_files`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setPublic_data_files(response3.data);
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

    fetchData();
  }, [navigate]);

  //get private files status
  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/private_files_status`,
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
        setPrivate_files_init_status(response.data);
      } catch (error) {
        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");
          console.log("refresh token: ", csrfRefreshToken);
          console.log("refreshing token");
          if (csrfRefreshToken) {
            try {
              console.log("trying");
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
                console.log("succeeded");
                const data = await response2.json();
         
             
                // And we retry the original request
                const response3 = await axios.get(
                  `${API_BASE_URL}/private_files_status`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setPrivate_files_init_status(response3.data);
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
    fetchData();
  }, [navigate]);

  //get public files status
  useEffect(() => {
    const fetchData = async () => {
      const csrfToken = Cookies.get("csrf_access_token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/public_files_status`,
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
          }
        );
        setPublic_files_init_status(response.data);
      } catch (error) {
        //If 401, we refresh the token
        if (error.response && error.response.status === 401) {
          const csrfRefreshToken = Cookies.get("csrf_refresh_token");
          console.log("refresh token: ", csrfRefreshToken);
          console.log("refreshing token");
          if (csrfRefreshToken) {
            try {
              console.log("trying");
              const response2 = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "X-CSRF-TOKEN": csrfRefreshToken,
                },
              });

              if (response2.ok) {
                console.log("succeeded");
                const data = await response2.json();
             
              

                // And we retry the original request
                const response3 = await axios.get(
                  `${API_BASE_URL}/public_files_status`,
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
                    },
                  }
                );
                setPublic_files_init_status(response3.data);
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
    fetchData();
  }, [navigate]);

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
                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150 cursor-pointer"
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

      {selectedSubmenu === "Query" && (
        <Query
          selectedFiles={selectedFileIds}
          query={query}
          setQuery={setQuery}
          instructions={instructions}
          setInstructions={setInstructions}
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          isAsked={isAsked}
          setIsAsked={setIsAsked}
          answer={answer}
          setAnswer={setAnswer}
          private_data_files={private_data_files}
          public_data_files={public_data_files}
          retrieved_data_files={retrieved_data_files}
          setRetrieved_data_files={setRetrieved_data_files}
        ></Query>
      )}
      {selectedSubmenu === "Files" && (
        <FilesSection
          fileList={private_data_files}
          selectedFileIds={selectedFileIds}
          setSelectedFileIds={setSelectedFileIds}
          isPublicMode={false}
          avatarMenuOpen={avatarMenuOpen}
          refreshFiles={refreshPrivateFiles}
          files_status={private_files_init_status}
          refreshFilesStatus={refreshPrivateFilesStatus}
        />
      )}
      {selectedSubmenu === "Community" && (
        <FilesSection
          fileList={public_data_files}
          selectedFileIds={selectedFileIds}
          setSelectedFileIds={setSelectedFileIds}
          isPublicMode={true}
          avatarMenuOpen={avatarMenuOpen}
          refreshFiles={refreshPublicFiles}
          files_status={public_files_init_status}
          refreshFilesStatus={refreshPublicFilesStatus}
        />
      )}
    </>
  );
}

export default TabsLayout;
