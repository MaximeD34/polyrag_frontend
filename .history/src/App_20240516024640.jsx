import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import Dashboard from "./components/Dashboard"; // Import the Dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Routes>
    </Router>
  );
};

export default App;
