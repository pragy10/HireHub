import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  // You can use context or localStorage for auth later
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="app-container">
      <Routes>
        {/* If user is logged in, show dashboard, else redirect to login */}
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Optional 404 route */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
