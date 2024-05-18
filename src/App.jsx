import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import LogOutPage from "./pages/LogOutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
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
  );
};

export default App;
