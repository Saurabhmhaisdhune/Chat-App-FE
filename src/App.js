import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import SetAvater from "./pages/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setavatar" element={<SetAvater />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
