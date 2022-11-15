import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import "./register.css";

function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    borderRadius: 20,
  };
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, username} = values;
    if (password === "") {
      toast.error(
        "Email and password is required",
        toastOptions
      );
      return false;
    } else if (username.length=== "") {
      toast.error(
        "Email and password is required",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {username, password} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="main1">
        <div className="main">
          <form action="" onSubmit={(event) => handleSubmit(event)} className="register-form">
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>Let's CHAT</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              min="3"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Login User</button>
            <span>
              Don't have an accout ? <Link to="/register">Register.</Link>
            </span>
          </form>
        </div>
        <div>
          <img
            src="https://cdn.dribbble.com/users/1894420/screenshots/11700268/online-video-chat.gif"
            alt="animation"
            className="animation"
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;