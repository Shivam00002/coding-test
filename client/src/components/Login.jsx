import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../Hooks/useCookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useCookie();

  
  useEffect(() => {
    if (auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const token = response.data;
      if (token) {
        navigate("/admin");
      }
      console.log("Token", token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md:w-[400px] shadow-lg mx-auto rounded-lg w-full h-fit px-2 py-2">
        <p className="text-center font-semibold text-gray-500 text-sm">
          Login here
        </p>
        <input
          className="px-2 w-full h-[30px] mt-2 p-2 border"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="px-2 w-full h-[30px] mt-2 p-2 border"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-2 w-full hover:bg-black bg-blue-500 font-bold rounded-lg text-white h-[30px] mt-5 border"
          type="submit"
        >
          Submit
        </button>{" "}
      </div>
    </form>
  );
};
