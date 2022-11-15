import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import "./register.css";

function Register() {
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
    email: "",
    password: "",
    confirmPassword: "",
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password, confirmPassword } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
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
        <div>
          <img
            src="https://cdn.dribbble.com/users/1894420/screenshots/11700268/online-video-chat.gif"
            alt="animation"
            className="animation"
          />
        </div>
        <div className="main">
          <form action="" onSubmit={(event) => handleSubmit(event)} className="register-form">
            <div className="brand">
              <img src={Logo} alt="logo" className="register-logos"/>
              <h1>Let's CHAT</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
