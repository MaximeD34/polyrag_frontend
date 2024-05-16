import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={"Hello World"}></Route>)
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
