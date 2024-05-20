import CheckboxComponent from "./CheckboxComponent";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import refreshToken from "../logic/Refresh";

function AddFileModal(
  { setIsModalOpen } // Destructuring the props object
) {
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddFile = async () => {
    toast.loading("Adding file...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("is_public", isPublic);

    const csrfToken = Cookies.get("csrf_access_token");
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });
      setIsModalOpen(false);

      if (response.status === 200) {
        toast.dismiss();
        window.location.reload();
        toast.success("File added successfully", {
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
      } else if (error.response && error.response.status === 401) {
        const csrfToken = await refreshToken();
        console.log(csrfToken);
        if (csrfToken) {
          handleAddFile();

          window.location.reload();
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
          padding: "1em",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-lg font-semibold">Add File</h2>

        <div className="mb-4">
          <h3>
            <label className="mb-4 block text-sm font-medium text-gray-700">
              Please select a file
            </label>
          </h3>

          <input
            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-4 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
            onChange={handleFileChange}
            type="file"
            id="formFile"
          />
        </div>

        <CheckboxComponent
          label_text="Public"
          subLabel_text="Anyone with the link can see this file"
          setIsPublic={setIsPublic}
        />

        <button
          className="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:bg-blue-700"
          onClick={handleAddFile}
        >
          Add File
        </button>

        <button
          className="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-500 focus:outline-none focus:bg-red-700"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddFileModal;
