/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { uploadJsonFile } from "../services/uploadJsonFile";
import { useNavigate } from "react-router-dom";
import { Simple as SimpleAlert } from "@reusejs/react-alerts";
import { setUserLogin } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

function UploadJsonFile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadableFile, setUploadableFile] = useState("");

  const handleFileUpload = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      let convertBase64 = e.target.result.replace(
        "data:application/json;base64,",
        ""
      );
      setUploadableFile(convertBase64);
      console.log(
        "files",
        e.target.result.replace("data:application/json;base64,", "")
      );
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let requestPayload = {
        encrypted_json: uploadableFile,
      };
      if (uploadableFile !== "") {
        let response = await uploadJsonFile(requestPayload);
        if (response.status === 200) {
          SimpleAlert({
            message: "JSON data uploaded to database succesfully.",
            borderClasses: "border-b-2 border-green-400",
            wrapperClasses: "inset-x-0 top-0 flex w-full z-[1000]",
            alignmentClasses: "w-full items-center",
          });
        }
      }
    } catch (error) {
      console.log("error-in-signup", error);
      SimpleAlert({
        message: error.message,
        borderClasses: "border-b-2 border-red-400",
        wrapperClasses: "inset-x-0 top-0 flex w-full z-[1000]",
        alignmentClasses: "w-full items-center",
      });
    }
  };
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
      <div className="flex justify-center pt-20">
        <div className="w-full max-w-sm">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e)}
            />
            <div className="flex mt-10 justify-center">
              <button
                className="bg-blue-500 w-60 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => submitHandler(e)}
              >
                Store JSON file in Database
              </button>
            </div>
            <div className="flex mt-5 justify-center">
              <button
                className="bg-green-500 w-60 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => navigate("/json-list")}
              >
                List of JSON Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadJsonFile;
