import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = async (form) => {
    const res = await axios.post("/api/auth/register", form);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data.user);
  };

  const login = async (form) => {
    const res = await axios.post("/api/auth/login", form);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
