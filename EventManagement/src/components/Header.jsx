import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the user's name
  const navigate = useNavigate(); // For redirecting after logout

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.Name); // Set user's name from localStorage
    }
  }, []);

  // Logout function to remove user data from localStorage
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName(""); // Clear the user's name from the state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="w-full bg-transparent border-b border-gray-200 bg-black">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" aria-label="home" className="w-nav-brand">
          <img
            src="/Persist.svg"
            alt="Logo"
            className="st-current h-10"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-2">
          {userName ? (
            // If logged in, show "Welcome, {userName}" and Logout
            <>
              <span className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300">
                Welcome, {userName}!
              </span>
              <button
                onClick={handleLogout}
                className="text-white py-2 px-6 rounded-lg border-2 border-transparent hover:text-[#7a56d6] hover:border-[#7a56d6] transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            // If not logged in, show Login and Sign Up buttons
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

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="w-full h-full absolute bg-black bg-opacity-50 top-0 left-0 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="bg-white p-6 w-4/5 h-full absolute top-0 right-0"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-4">
              {userName ? (
                <>
                  <span className="block text-black py-2 px-6 rounded-lg text-center">
                    Welcome, {userName}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="block bg-red-500 text-white py-2 px-6 rounded-lg text-center hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block bg-blue-600 text-white py-2 px-6 rounded-lg text-center hover:bg-blue-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gray-200 text-gray-800 py-2 px-6 rounded-lg text-center hover:bg-gray-300"
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
