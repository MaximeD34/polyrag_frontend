import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Page not found
          </h3>
          <p className="text-gray-600">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
