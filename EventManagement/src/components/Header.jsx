import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.Name);
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserName("");
    setUserRole("");
    navigate("/login");
  };

  return (
    <header className="w-full bg-black border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" aria-label="home" className="w-nav-brand">
          <img
            src="/Persist.svg"
            alt="Logo"
            className="h-10"
          />
        </a>

        <nav className="hidden md:flex space-x-4">
          {userName ? (
            <>
              <span className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300">
                Welcome, {userName}!
              </span>
              {userRole === "admin" && (
                <Link
                  to="/addevent"
                  className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300"
                >
                  Add Event
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center"
          aria-label="menu"
        >
          <img
            src="https://cdn.prod.website-files.com/623ae64112adcf772da9687e/623b0075027a4256d711d3f3_menu-icon.svg"
            alt="Menu Icon"
            className="w-6 h-6"
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="w-full h-full absolute bg-black bg-opacity-80 top-0 left-0 z-10 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="bg-black text-white p-6 w-4/5 h-full absolute top-0 right-0"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-4">
              {userName ? (
                <>
                  <span className="block text-white py-2 px-6 rounded-lg text-center">
                    Welcome, {userName}!
                  </span>
                  {userRole === "admin" && (
                    <Link
                      to="/addevent"
                      className="block text-white py-2 px-6 rounded-lg text-center hover:text-[#7a56d6] transition-colors duration-300"
                    >
                      Add Event
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block text-white py-2 px-6 rounded-lg text-center hover:text-[#7a56d6] transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-white py-2 px-6 rounded-lg text-center hover:text-[#7a56d6] transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gray-200 text-gray-800 py-2 px-6 rounded-lg text-center hover:bg-gray-300 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
