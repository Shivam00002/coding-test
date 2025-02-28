import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDataStore } from "../lib/zustand";
import { useCookie } from "../Hooks/useCookie";
import { useNavigate } from "react-router-dom";

const AdminForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { data, getData } = useDataStore();
  const navigate = useNavigate();
  const auth = useCookie();
  console.log("auth", auth);
  if (!auth) {
    navigate("/login");
  }


  const handleLogout = () => {
    const getCookieValue = (name) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    };
    const jwtCookieValue = getCookieValue("jwt");
    if (jwtCookieValue) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } else {
      console.error("JWT cookie not found.");
    }
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", desc);
    formData.append("Attachment", file);
    try {
      const res = await axios.post("http://localhost:5000/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelte = async (id) => {
    await axios.delete(`http://localhost:5000/projects/${id}`);
    getData();
  };

  return (
    <>
      <form
        onSubmit={postData}
        className="rounded-lg shadow-lg md:w-[450px] mx-auto w-full h-fit p-4 border"
      >
        <button
          onClick={handleLogout}
          className="px-3 rounded-lg shadow-lg bg-red-500 text-sm text-white"
        >
          Log Out{" "}
        </button>
        <input
          onChange={(e) => setName(e.target.value)}
          className="px-2 w-full h-[30px] mt-2 p-2 border"
          type="text"
          placeholder="Enter Project name"
        />{" "}
        <br />
        <input
          onChange={(e) => setDesc(e.target.value)}
          className="px-2 w-full h-[30px] mt-2 p-2 border"
          type="text"
          placeholder="Enter Description"
        />{" "}
        <br />
        <input
          onChange={handleFileChange}
          className="px-2 w-full h-[30px] mt-2 border"
          type="file"
        />
        <button
          className="px-2 w-full bg-blue-500 font-bold rounded-lg text-white h-[30px] mt-5 border"
          type="submit"
        >
          Submit
        </button>{" "}
        <br />
      </form>

      <div className="md:w-[1250px] mx-auto w-full h-fit">
        <div className="w-full mt-5 ">
          {data?.map((el, index) => {
            return (
              <div
                className="shadow-lg px-3 py-3 rounded-lg md:w-[300px] h-fit w-full mx-auto"
                key={index}
              >
                <h2 className="text-blue-400 font-semibold">{el.Name}</h2>
                <p className="text-gray-500 text-sm font-semibold ">
                  {el.Description}
                </p>
                <p className="text-gray-500 text-sm font-semibold ">
                  <span className="text-orange-600">Bids </span>
                  {el.Bids}
                </p>
                <img
                  alt="img"
                  className="w-[150px] mx-auto h-[150px]"
                  src={`http://localhost:5000/${el.Attachment}`}
                />
                <button
                  onClick={() => handleDelte(el._id)}
                  className="font-semibold py-[2px] mt-2 text-white px-2 text-sm bg-orange-600 hover:bg-black rounded-md w-full"
                >
                  {" "}
                  Delete Project
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminForm;
