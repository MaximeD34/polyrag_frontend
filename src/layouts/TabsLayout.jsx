import { useState, useEffect, useRef } from "react";
import AvatarMenue from "./AvatarMenue";

function TabsLayout() {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) paths with your paths
  const navigation = [{ title: "Pro version", path: "javascript:void(0)" }];

  const submenuNav = [
    { title: "Overview", path: "javascript:void(0)" },
    { title: "Integration", path: "javascript:void(0)" },
    { title: "Billing", path: "javascript:void(0)" },
    { title: "Transactions", path: "javascript:void(0)" },
    { title: "Plans", path: "javascript:void(0)" },
  ];

  const [selectedSubmenu, setSelectedSubmenu] = useState(submenuNav[0].title);
  return (
    <>
      <header className="text-base lg:text-sm">
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
                onClick={() => setState(!state)}
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

              {navigation.map((item, idx) => {
                return (
                  <li key={idx}>
                    <a
                      href={item.path}
                      className="block text-gray-700 hover:text-gray-900"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
              <AvatarMenue />
            </ul>
          </div>
        </div>
        <nav className="border-b">
          <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
            {submenuNav.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`py-1 ${
                    selectedSubmenu === item.title
                      ? "border-b-2 border-indigo-600"
                      : ""
                  }`}
                >
                  <a
                    href="javascript:void(0)"
                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150"
                    onClick={() => setSelectedSubmenu(item.title)}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {selectedSubmenu === "Overview" && <h1>Test1</h1>}
      {selectedSubmenu === "Integration" && <h1>Test2</h1>}
      {selectedSubmenu === "Billing" && <h1>Test3</h1>}
      {selectedSubmenu === "Transactions" && <h1>Test4</h1>}
      {selectedSubmenu === "Plans" && <h1>Test5</h1>}
    </>
  );
}

export default TabsLayout;
