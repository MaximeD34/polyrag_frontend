import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/profile.jpg";

// Avtar with darpdown menu
const AvatarMenue = ({ avatarMenuOpen, setAvatarMenuOpen, is_admin }) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();

  const navigation = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "History", path: "/history" },
    { title: "Analytics", path: "/analytics" },
  ];
  if (is_admin) {
    navigation.push({ title: "All histories (admin)", path: "/admin/history" });
    navigation.push({
      title: "All users analytics (admin)",
      path: "/admin/analytics",
    });
  }

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setState(false);
      }
    };
    document.addEventListener("click", handleDropDown);

    // Clean up function
    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button
          ref={profileRef}
          className="hidden w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
          onClick={() => {
            const newState = !state;
            setState(newState);
            setAvatarMenuOpen(newState);
          }}
        >
          <img src={logo} className="w-full h-full rounded-full" />
        </button>
      </div>
      <ul
        className={`z-50 bg-white top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
        onClick={() => {
          const newState = !state;
          setState(newState);
          setAvatarMenuOpen(newState);
        }}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              className="block text-gray-600 hover:text-gray-900 lg:hover:bg-gray-50 lg:p-3"
              to={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
        <button
          onClick={() => navigate("/logout")}
          className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:bg-gray-50 lg:p-3"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default AvatarMenue;
