import React, { useContext } from "react";
import { BookOpen, Sun, Moon } from "lucide-react";
import { ThemeDataContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeDataContext);
  let { isLoggedin } = useSelector((state) => state.user);

  return (
    <nav className={`shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BookOpen
              className={`h-8 w-8 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <span
              className={`ml-2 text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Learnify
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {isLoggedin === false ? (
              <>
                {/* Sign Up Link */}
                <Link
                  to={"/register/student"}
                  className={`text-sm ${
                    window.location.href ===
                    "http://localhost:5173/register/student"
                      ? "hidden"
                      : "block"
                  } font-medium ${
                    darkMode
                      ? "text-white hover:text-indigo-400"
                      : "text-indigo-600 hover:text-indigo-800"
                  }`}
                >
                  Sign Up
                </Link>
                {/* Sign in link */}
                <Link
                  to={"/login/student"}
                  className={`text-sm ${
                    window.location.href ===
                    "http://localhost:5173/register/student"
                      ? "hidden"
                      : "block"
                  } font-medium ${
                    darkMode
                      ? "text-white hover:text-indigo-400"
                      : "text-indigo-600 hover:text-indigo-800"
                  }`}
                >
                  Login
                </Link>
              </>
            ) : <div>Profile</div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
