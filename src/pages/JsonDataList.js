/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJsonData } from "../services/getJsonData";
import { setUserLogin } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

function JsonDataList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jsonArray, setJsonArray] = useState([]);
  const fetchJsonDataCallbackRef = useRef(() => {});

  fetchJsonDataCallbackRef.current = async () => {
    let response = await getJsonData();
    setJsonArray(response);
  };

  useEffect(() => {
    fetchJsonDataCallbackRef.current();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex w-full shadow-md flex-row-reverse p-3">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            dispatch(setUserLogin({ accessToken: null }));
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center pt-10">
        <div className="w-full max-w-4xl h-[40rem] overflow-auto">
          {jsonArray.length > 0 ? (
            jsonArray.map((item, index) => {
              return (
                <div
                  className="bg-white shadow-md rounded border border-green-400 px-8 pt-6 pb-8 mb-4 space-y- "
                  key={index}
                >
                  <div className="flex text-sm">
                    <p className="w-40">UserId:</p>
                    <p className="w-full break-all">{item.userId}</p>
                  </div>
                  <div className="flex text-sm">
                    <p className="w-40">Id:</p>
                    <p className="w-full">{item.id}</p>
                  </div>
                  <div className="flex text-sm">
                    <p className="w-40">Title:</p>
                    <p className="w-full">{item.title}</p>
                  </div>
                  <div className="flex text-sm">
                    <p className="w-40">Body:</p>
                    <p className="w-full">{item.body}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center text-red-700">
              No JSON Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JsonDataList;
