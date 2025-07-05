import { useState } from "react";
import toast from "react-hot-toast";
import {
    FaBars,
    FaBriefcase,
    FaHome,
    FaPlus,
    FaSearch,
    FaSignOutAlt,
    FaTimes,
    FaUser
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-900">HireHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FaHome className="inline mr-1" />
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FaSearch className="inline mr-1" />
              Find Jobs
            </Link>
            <Link 
              to="/recruitment" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Recruitment
            </Link>
            
            {user ? (
              <>
                {user.role === "employer" && (
                  <Link 
                    to="/post-job" 
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <FaPlus className="inline mr-1" />
                    Post Job
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <FaUser className="text-sm" />
                    <span>{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    {user.role === "jobseeker" && (
                      <Link 
                        to="/applied-jobs" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Applied Jobs
                      </Link>
                    )}
                    {user.role === "employer" && (
                      <Link 
                        to="/employer-dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Employer Dashboard
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="inline mr-2" />
                Home
              </Link>
              <Link 
                to="/jobs" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSearch className="inline mr-2" />
                Find Jobs
              </Link>
              <Link 
                to="/recruitment" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Recruitment
              </Link>
              
              {user ? (
                <>
                  {user.role === "employer" && (
                    <Link 
                      to="/post-job" 
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaPlus className="inline mr-2" />
                      Post Job
                    </Link>
                  )}
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="inline mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.role === "jobseeker" && (
                    <Link 
                      to="/applied-jobs" 
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Applied Jobs
                    </Link>
                  )}
                  {user.role === "employer" && (
                    <Link 
                      to="/employer-dashboard" 
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Employer Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 rounded-md text-base font-medium"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 