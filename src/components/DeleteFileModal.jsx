import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import axios from "axios";
import refreshToken from "../logic/Refresh";

function DeleteFileModal(
  { setIsDeleteModalOpen, file_id, file_name } // Destructuring the props object
) {
  const handleFileDeletion = async () => {
    console.log("Deleting file...");
    toast.loading("Deleting file...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const csrfToken = Cookies.get("csrf_access_token");
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${file_id}`, {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });
      setIsDeleteModalOpen(false);

      if (response.status === 200) {
        toast.dismiss();
        window.location.reload();
        toast.success("File deleted successfully", {
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
        window.location.reload();
      } else if (error.response && error.response.status === 401) {
        const csrfToken = await refreshToken();
        if (csrfToken) {
          handleFileDeletion();

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
        <h2 className="text-lg font-semibold">Delete File</h2>

        <div className="mb-4">
          <h3>
            <label className="mb-4 block text-sm font-medium text-gray-700">
              Are you sure you want to delete the file
              <br />
              <i>{file_name}</i> ?
            </label>
          </h3>
        </div>

        <button
          className="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-500 focus:outline-none focus:bg-red-700"
          onClick={handleFileDeletion}
        >
          Delete File
        </button>

        <button
          className="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-gray-600 rounded-lg cursor-pointer hover:bg-gray-500 focus:outline-none focus:bg-gray-700"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteFileModal;
