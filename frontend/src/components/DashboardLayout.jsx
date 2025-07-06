import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      {/* Sidebar overlay for all screen sizes */}
      {sidebarOpen && user && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex pt-20">
        {/* Sidebar - only show if user is logged in */}
        {user && (
          <div className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        )}
        {/* Main content */}
        <main className={`flex-1 w-full transition-all duration-300 flex justify-center items-start ${user && sidebarOpen ? 'ml-64' : ''} p-4 md:p-8`}>
          <div className="max-w-7xl w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 