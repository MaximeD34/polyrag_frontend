import React from "react";
import { useState } from "react";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [signupFailed, setSignupFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setPassword("");
      setVerifyPassword("");
      setSignupFailed(true);

      toast.error("Passwords do not match", {
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

    const data = { email, password, username };

    console.log(JSON.stringify(data));

    try {
      const response = await fetch(`${API_BASE_URL}/create_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setPassword("");
        setSignupFailed(true);
        toast.error("Signup failed", {
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
      console.error(error);
      setPassword("");
      setSignupFailed(true);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <ToastContainer />

      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          {/* Logo */}
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create your account
            </h3>
            <p className="">
              Already have an account ?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Username</label>
            <input
              type="username"
              required
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                signupFailed ? "border-red-600" : "focus:border-indigo-600"
              } shadow-sm rounded-lg`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                signupFailed ? "border-red-600" : "focus:border-indigo-600"
              } shadow-sm rounded-lg`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                signupFailed ? "border-red-600" : "focus:border-indigo-600"
              } shadow-sm rounded-lg`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Verify password</label>
            <input
              type="password"
              required
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ${
                signupFailed ? "border-red-600" : "focus:border-indigo-600"
              } shadow-sm rounded-lg`}
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </div>

          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create account
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
