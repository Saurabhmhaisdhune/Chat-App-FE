import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import "./logout.css";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
    
  const navigate = useNavigate();

  const handleClick = async () => {
   
      localStorage.clear();
      navigate("/login");
    
  };
  return (
    <button onClick={handleClick} className="logout-button">
      <BiPowerOff className="logout-icon" />
    </button>
  );
}
