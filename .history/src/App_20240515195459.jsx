import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Navbar />}></Route>)
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
