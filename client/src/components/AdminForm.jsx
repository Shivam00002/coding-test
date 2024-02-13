import React, { useState } from "react";
import axios from "axios";

const AdminForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleFilechange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const data = { Name: name, Description: desc, Attachment: file };
    console.log(data)
    try {
    let res = await axios.post("http://localhost:5000/projects", data);
      console.log(res);
    } catch (e) {
      console.log(encodeURI);
    }
  };

  return (
    <form
      onSubmit={postData}
      className=" rounded-lg shadow-lg md:w-[450px] mx-auto  w-full h-fit p-4 border"
    >
      <input
        onChange={(e) => setName(e.target.value)}
        className="px-2 w-full h-[30px] mt-2 p-2 border "
        type="text"
        placeholder="Enter Project name"
      />{" "}
      <br />
      <input
        onChange={(e) => setDesc(e.target.value)}
        className="px-2 w-full h-[30px] mt-2 p-2 border "
        type="text"
        placeholder="Enter Description"
      />{" "}
      <br />
      <input
        onChange={handleFilechange}
        className="px-2 w-full h-[30px] mt-2  border "
        type="file"
      />
      <input
        className="px-2 w-full bg-blue-500 font-bold  rounded-lg text-white h-[30px] mt-5  border "
        type="submit"
      />{" "}
      <br />
    </form>
  );
};

export default AdminForm;
