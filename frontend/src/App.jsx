import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppliedJobs from "./pages/AppliedJobs";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import JobList from "./pages/JobList";
import Login from "./pages/Login";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { FaBriefcase, FaRocket, FaSpinner } from "react-icons/fa";

// Enhanced Loading Component
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto animate-pulse">
            <FaBriefcase className="text-3xl text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center animate-bounce">
            <FaRocket className="text-white text-sm" />
          </div>
        </div>
        
        {/* Loading Animation */}
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
          Loading HireHub
        </h2>
        <p className="text-gray-600 text-lg">
          Preparing your career journey...
        </p>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

// Enhanced 404 Page Component
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
        </div>
        
        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Action Button */}
        <Navigate to="/" replace />
      </div>
    </div>
  );
};

// Enhanced Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Enhanced App Content Component
function AppContent() {
  const { user, loading } = useAuth();

  // Show loading screen while auth is being determined
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <Register />} 
          />
          <Route 
            path="/forgot-password" 
            element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} 
          />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/applied-jobs" 
            element={
              <ProtectedRoute allowedRoles={["jobseeker"]}>
                <AppliedJobs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/post-job" 
            element={
              <ProtectedRoute allowedRoles={["employer", "admin"]}>
                <PostJob />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employer-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["employer", "admin"]}>
                <EmployerDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      {/* Enhanced Footer */}
      <Footer />
      
      {/* Enhanced Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            color: '#374151',
            border: '1px solid rgba(229, 231, 235, 0.5)',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontSize: '14px',
            fontWeight: '500',
            padding: '16px 20px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
            style: {
              border: '1px solid rgba(16, 185, 129, 0.3)',
              background: 'rgba(236, 253, 245, 0.95)',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(254, 242, 242, 0.95)',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#FFFFFF',
            },
            style: {
              border: '1px solid rgba(59, 130, 246, 0.3)',
              background: 'rgba(239, 246, 255, 0.95)',
            },
          },
        }}
      />
    </div>
  );
}

// Enhanced Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-wrapper">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
