import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import LogOutPage from "./pages/LogOutPage";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
import io from "socket.io-client";
import { createContext } from "react";
import { API_BASE_URL } from "../config";

// export const SocketContext = createContext();

// const socket = io(API_BASE_URL, {
//   transports: ["websocket"],
//   timeout: 20000,
// });

const App = () => {
  // useEffect(() => {
  //   return () => {
  //     if (socket.connected) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  return (
    // <SocketContext.Provider value={socket}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<LogOutPage />} />
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    // </SocketContext.Provider>
  );
};

export default App;
