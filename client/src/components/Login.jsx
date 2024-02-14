import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const token = response.data.token;
      // Secure and HttpOnly flags, SameSite attribute
      const cookieOptions = "path=/; Secure; HttpOnly; SameSite=Lax";
      // Optionally set token expiration if available in the response
      // const tokenExpiration = new Date(response.data.expiresAt);
      // cookieOptions += `; expires=${tokenExpiration.toUTCString()}`;
      let x =  document.cookie = `jwt=${token}; ${cookieOptions}`;
      console.log(x)
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
