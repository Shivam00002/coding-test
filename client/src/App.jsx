import React from "react";
import "./App.css";
import AdminForm from "./components/AdminForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import Home from "./components/Home";

function App() {
  return (

    <>
      <div className="w-full h-fit md:px-10 px-2 py-2 flex justify-between p-2 bg-blue-500 text-white">
        <a href="/">
          <h1 className="font-bold text-center text-[20px] ">Online Work</h1>
        </a>
        <a href="/login">
          <h1 className="text-center text-[15px] ">Login</h1>
        </a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
