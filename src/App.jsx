import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import LogOutPage from "./pages/LogOutPage";
import SignupPage from "./pages/SignupPage";
import AdminHistory from "./pages/AdminHistory";
import History from "./pages/History";
import AdminAnalytics from "./pages/AdminAnalytics";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/admin/history" element={<AdminHistory />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
