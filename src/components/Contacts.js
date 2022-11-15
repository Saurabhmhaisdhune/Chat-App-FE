import React, { useState, useEffect } from "react";
import "./contacts.css"
import Logo from "../assets/logo.png";

export default function Contacts({ contacts,currentUser,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  // useEffect(async () => {
  //   const data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   setCurrentUserName(data.username);
  //   setCurrentUserImage(data.avatarImage);
  // }, []);
  // const changeCurrentChat = (index, contact) => {
  //   setCurrentSelected(index);
  //   changeChat(contact);
  // };

useEffect(()=>{
    if(currentUser){
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
    }
},[currentUser]);
const changeCurrentChat = (index,contact)=>{
  setCurrentSelected(index);
  changeChat(contact);
}
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contacts-main-div">
          <div className="brands">
            <img src={Logo} alt="logo" />
            <h3 className="contact-h3">Let's Chat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatars">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="current-user-avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


