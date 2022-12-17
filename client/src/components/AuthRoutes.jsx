import { Routes, Route, Navigate } from "react-router-dom";

// components
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

// context
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

function AuthRoutes() {
  
  const {user} = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
    </Routes>
  );
}

export default AuthRoutes;
