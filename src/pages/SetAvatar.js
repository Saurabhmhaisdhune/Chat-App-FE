import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/load.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import axios from "axios";
import "./setavatar.css";

function SetAvater() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    borderRadius: 20,
  };

  // useEffect(() => {
  //   if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
  //     navigate("/login");
  // }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const data = [];
    const loadData = async () => {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="upper-main-div">
      {isLoading ? (
        <div>
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="main-div">
          <div>
            <p className="title-container">
              Select any Avatar as your profile picture
            </p>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatatr"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default SetAvater;
