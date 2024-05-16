import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import Dashboard from "./Dashboard"; // Import the Dashboard component

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<HomePage />}></Route>)
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
