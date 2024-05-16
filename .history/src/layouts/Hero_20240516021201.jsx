import React from "react";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const navigation = [
    { title: "Test", path: "javascript:void(0)" },
    { title: "Integrations", path: "javascript:void(0)" },
  ];

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="/">
        <img
          src="https://www.floatui.com/logo-dark.svg"
          width={140}
          alt="Float UI logo"
        />
      </a>
    </div>
  );

  return (
    <div className="bg-gray-900">
      <header>
        <nav
          className={`pb-11 md:text-sm ${"absolute z-20 top-0 inset-x-0 bg-gray800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"}`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-10 pb-2 md:flex md:px-1">
            <Brand />
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${"hidden"} `}
            >
              <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-gray-300 hover:text-gray-400">
                      <a href={item.path} className="block">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href="javascript:void(0)"
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex"
                  >
                    Get started
                    <svg
                      xmlns="http://www..org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section className="relative">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 pt-10 pb-20 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
              PolyRag
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Query your documents with natural language using PolyRag
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="justify-center items-center gap-x-3 sm:flex"
            >
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 text-gray-400 bg-gray-700 focus:bg-gray-900 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto"
              />
              <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto">
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* Background */}
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </section>
    </div>
  );
};

export default MainLayout;
