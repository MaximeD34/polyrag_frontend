import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config";
import refreshToken from "../logic/Refresh";
import Loading from "../components/Loading.jsx";

function Query({
  selectedFiles,
  query,
  setQuery,
  isAnswered,
  setIsAnswered,
  isAsked,
  setIsAsked,
  answer,
  setAnswer,
}) {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleQuery = async () => {
    if (query === "") {
      toast.error("Please enter a query", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Query the selected files

    toast.loading("Querying files...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsAsked(true);

    const csrfToken = Cookies.get("csrf_access_token");
    const body = {
      query: query,
      filecodes: selectedFiles,
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/query`, body, {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });

      if (response.status === 200) {
        toast.dismiss();
        console.log(response.data.response);
        setIsAnswered(true);
        setAnswer(response.data.response);

        toast.success("The question is answered !", {
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

        setIsAsked(false);
        setIsAnswered(false);
      } else if (error.response && error.response.status === 401) {
        const csrfToken = await refreshToken();
        if (csrfToken) {
          handleQuery();
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
          setIsAsked(false);
          setIsAnswered(false);
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
        setIsAsked(false);
        setIsAnswered(false);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-7 mb-12">
      <ToastContainer />

      {!isAsked && (
        <>
          <p className="text-gray-600 mt-0 mb-8">
            <b>
              <i>
                You can select the files you want to query in the Files and
                Community tabs
              </i>
            </b>
          </p>
          <div className="items-start justify-between md:flex flex-col">
            <div className="max-w-lg mb-4">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Enter your query !
              </h3>
            </div>
          </div>
          <div>
            <label>Here you can ask your question</label>
            <div className="relative mb-3 mt-2" data-twe-input-wrapper-init>
              <textarea
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your question"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
              <label
                htmlFor="exampleFormControlTextarea1"
                className={`absolute left-3 top-3 text-gray-500 transition-opacity duration-200 ease-in-out ${
                  isFocused ? "opacity-0" : "opacity-100"
                }`}
              ></label>
            </div>

            <button
              onClick={() => handleQuery()}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-blue-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              type="submit"
            >
              Query
            </button>
          </div>
        </>
      )}

      {isAsked && <>{!isAnswered && <Loading />}</>}

      {isAnswered && (
        <div>
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            The answer is :
          </h3>
          <div className="mt-4">
            <p className="text-gray-600">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Query;
