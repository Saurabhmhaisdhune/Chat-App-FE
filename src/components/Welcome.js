import React, { useState, useEffect } from "react";
import "./welcome.css";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const oneeffect=async()=>{
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
      }
      oneeffect();
  }, []);
  return (
    <div className='welcome-container'>
      <img src={Robot} alt="gifs" className="img"/>
      <h1 className="welcome-message">
        Welcome, <span className="span">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  )
}
