import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDataStore } from "../lib/zustand";

const AllProjects = () => {
  const { data, getData } = useDataStore();

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  return (
    <div className="md:w-[1250px] mx-auto w-full h-fit">
      <div className="w-full mt-5 md:grid grid-cols-4 gap-2">
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
                <span className="text-orange-600">Bids</span> {0}
              </p>

              <img alt="img" className="w-[150px] mx-auto h-[150px]" src={`http://localhost:5000/${el.Attachment}`} />
             
              <button className="font-semibold py-[2px] text-white px-2 text-sm bg-blue-500 hover:bg-black rounded-md w-full">
                {" "}
                Create Bid
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProjects;
