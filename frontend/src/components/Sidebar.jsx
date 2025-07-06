import toast from "react-hot-toast";
import {
    FaBriefcase,
    FaChartLine,
    FaCog,
    FaHome,
    FaSignOutAlt,
    FaTimes,
    FaUser,
    FaUserTie
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const jobseekerMenuItems = [
    { path: "/dashboard", icon: <FaHome className="text-lg" />, label: "Dashboard", description: "Overview & Stats" },
    { path: "/profile", icon: <FaUser className="text-lg" />, label: "Profile", description: "Personal Information" },
    { path: "/applied-jobs", icon: <FaBriefcase className="text-lg" />, label: "Applied Jobs", description: "Track Applications" }
  ];
  const employerMenuItems = [
    { path: "/dashboard", icon: <FaHome className="text-lg" />, label: "Dashboard", description: "Overview & Stats" },
    { path: "/profile", icon: <FaUserTie className="text-lg" />, label: "Profile", description: "Company Information" },
    { path: "/employer-dashboard", icon: <FaChartLine className="text-lg" />, label: "Employer Dashboard", description: "Manage Jobs" }
  ];
  const menuItems = user?.role === "jobseeker" ? jobseekerMenuItems : user?.role === "employer" ? employerMenuItems : [];
  if (!user) return null;

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-blue-100 shadow-lg z-50 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FaBriefcase className="text-white text-lg" />
          </div>
          <span className="font-bold text-blue-700 text-xl tracking-wide">HireHub</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <FaTimes className="text-blue-600 text-xl" />
        </button>
      </div>
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group font-semibold ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-blue-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <div className={`${isActive(item.path) ? "text-white" : "text-blue-400 group-hover:text-blue-600"}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.label}</div>
                <div className={`text-xs ${isActive(item.path) ? "text-blue-200" : "text-blue-400"}`}>{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="my-6 border-t border-blue-100"></div>
        <div className="space-y-2">
          <Link
            to="/settings"
            onClick={handleNavClick}
            className="flex items-center space-x-3 p-3 rounded-xl text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group font-semibold"
          >
            <FaCog className="text-blue-400 group-hover:text-blue-600" />
            <span className="font-semibold">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group w-full font-semibold"
          >
            <FaSignOutAlt className="text-red-500 group-hover:text-red-600" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </nav>
      {/* User Info */}
      {user && (
        <div className="p-4 border-t border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaUser className="text-white text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-blue-700 truncate">{user.name}</p>
              <p className="text-xs text-blue-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 