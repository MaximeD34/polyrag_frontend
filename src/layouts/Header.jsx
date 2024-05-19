import AvatarMenue from "./AvatarMenue";
import { useState } from "react";

function Header({ username, avatarMenuOpen, setAvatarMenuOpen }) {
  const [state, setState] = useState(false);
  return (
    <div
      className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${
        state ? "h-full fixed inset-x-0" : ""
      }`}
    >
      <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
        <a href="/">
          <img
            src="https://www.floatui.com/logo.svg"
            width={120}
            height={50}
            alt="Float UI logo"
          />
        </a>
        <div className="lg:hidden">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => (setState(!state), setAvatarMenuOpen(!state))}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${
          state ? "" : "hidden"
        }`}
      >
        <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
          <div className="flex-1 items-center justify-start pb-4 lg:flex lg:pb-0"></div>

          <h1>
            Welcome{" "}
            <strong>
              <em>{username}</em>
            </strong>
          </h1>
          <AvatarMenue
            avatarMenuOpen={avatarMenuOpen}
            setAvatarMenuOpen={setAvatarMenuOpen}
          />
        </ul>
      </div>
    </div>
  );
}

export default Header;
