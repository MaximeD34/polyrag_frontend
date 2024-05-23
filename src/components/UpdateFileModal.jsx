import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import axios from "axios";
import refreshToken from "../logic/Refresh";
import { useState } from "react";
import CheckboxComponent from "./CheckboxComponent";

function UpdateFileModal(
  {
    setIsUpdateModalOpen,
    file_id,
    file_name,
    file_is_public,
    refreshPrivateFiles,
  } // Destructuring the props object
) {
  const [new_file_name, setNew_file_name] = useState(file_name);
  const [new_file_is_public, setNew_file_is_public] = useState(file_is_public);

  const handleFileUpdate = async () => {
    console.log("Updating file...");
    toast.loading("Updating file...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const csrfToken = Cookies.get("csrf_access_token");
    const formData = new FormData();
    formData.append("is_public", new_file_is_public.toString());
    formData.append("file_name", new_file_name);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/modify/${file_id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );
      setIsUpdateModalOpen(false);

      if (response.status === 200) {
        toast.dismiss();
        refreshPrivateFiles();
        toast.success("File updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error); // Log the error

      if (error.response && error.response.status === 400) {
        toast.dismiss();
        const error_to_display = error.response.data.error;
        console.log(error_to_display);
        toast.error(error_to_display, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (error.response && error.response.status === 404) {
        refreshPrivateFiles();
      } else if (error.response && error.response.status === 401) {
        const csrfToken = await refreshToken();
        if (csrfToken) {
          handleFileUpdate();

          refreshPrivateFiles();
        } else {
          toast.error(
            "An error occurred with your identification. Please try again later.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <ToastContainer />

      <div
        style={{
          backgroundColor: "white",
          padding: "1.4em",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Update File</h2>

        <label
          className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
          htmlFor="inline-full-name"
        >
          New file name
        </label>

        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-4"
          id="inline-full-name"
          type="text"
          value={new_file_name}
          onChange={(e) => setNew_file_name(e.target.value)}
        />

        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
          New file visibility
        </label>

        <CheckboxComponent
          label_text="Public"
          subLabel_text="Anyone with the link can see this file"
          setIsPublic={setNew_file_is_public}
          isPublic={new_file_is_public}
        />

        <button
          className="mt-4 block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:bg-blue-700"
          onClick={handleFileUpdate}
          type="submit"
        >
          Update File
        </button>

        <button
          className="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-500 focus:outline-none focus:bg-red-700"
          onClick={() => setIsUpdateModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateFileModal;
