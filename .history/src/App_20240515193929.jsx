import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobPage />} loader={jobLoader} />

      {/* Handle 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
