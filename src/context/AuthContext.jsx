import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  //  Fetch user from backend on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        setuser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        setuser(null);
        localStorage.removeItem("user");
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);

  //  Immediately set user after login
  const login = (userData) => {
    setuser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  //  Logout from both backend + frontend
  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {  // 🔁 changed GET → POST
        withCredentials: true,
      });
    } catch (error) {
      console.log("Logout error:", error.message);
    }
    setuser(null);
    localStorage.removeItem("user");
  };

  //  Restore user from localStorage (optional improvement)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setuser(JSON.parse(storedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setuser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
