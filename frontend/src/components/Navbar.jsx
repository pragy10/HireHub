import { useState } from "react";
import { FaBars, FaBell, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'white',
      padding: '10px 20px',
      borderBottom: '2px solid blue',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo & Hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          style={{ 
            padding: '8px', 
            borderRadius: '8px', 
            border: 'none',
            background: 'lightblue',
            cursor: 'pointer'
          }} 
          onClick={onMenuClick}
        >
          <FaBars style={{ color: 'blue', fontSize: '20px' }} />
        </button>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          textDecoration: 'none',
          color: 'blue',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          <span>HireHub</span>
        </Link>
      </div>
      
      {/* Center Nav & Search */}
      <div style={{ display: 'none', alignItems: 'center', gap: '24px' }}>
        <Link to="/" style={{ 
          fontWeight: 'bold', 
          padding: '8px 12px', 
          borderRadius: '8px',
          textDecoration: 'none',
          color: isActive("/") ? 'white' : 'blue',
          background: isActive("/") ? 'blue' : 'transparent'
        }}>
          Home
        </Link>
        <Link to="/jobs" style={{ 
          fontWeight: 'bold', 
          padding: '8px 12px', 
          borderRadius: '8px',
          textDecoration: 'none',
          color: isActive("/jobs") ? 'white' : 'blue',
          background: isActive("/jobs") ? 'blue' : 'transparent'
        }}>
          Jobs
        </Link>
      </div>
      
      {/* Right: User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'lightblue',
                color: 'blue',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle style={{ fontSize: '20px' }} />
              <span style={{ display: 'none' }}>{user.name.split(" ")[0]}</span>
            </button>
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '8px',
                width: '200px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid lightblue',
                zIndex: 50
              }}>
                <Link to="/profile" style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: 'blue',
                  textDecoration: 'none',
                  borderBottom: '1px solid lightgray'
                }}>
                  Profile
                </Link>
                <Link to="/dashboard" style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: 'blue',
                  textDecoration: 'none',
                  borderBottom: '1px solid lightgray'
                }}>
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px 16px',
                    color: 'red',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/login" style={{
              background: 'white',
              border: '2px solid blue',
              color: 'blue',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              background: 'blue',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 