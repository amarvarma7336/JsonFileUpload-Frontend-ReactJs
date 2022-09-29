/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { login } from "../services/login";
import { useNavigate } from "react-router-dom";
import { Simple as SimpleAlert } from "@reusejs/react-alerts";
import { setUserLogin } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [storeToken, setStoreToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
      setIsUsername(true);
      setIsPassword(true);
    } else if (username === "" && password !== "") {
      setIsUsername(true);
      setIsPassword(false);
    } else if (password === "" && username !== "") {
      setIsPassword(true);
      setIsUsername(false);
    } else if (username !== "" && password !== "") {
      setIsUsername(false);
      setIsPassword(false);
      try {
        let requestPayload = {
          username: username,
          password: password,
        };
        let response = await login(requestPayload);
        if (response.status === 200) {
          SimpleAlert({
            message: "User successfully logged in.",
            borderClasses: "border-b-2 border-green-400",
            wrapperClasses: "inset-x-0 top-0 flex w-full z-[1000]",
            alignmentClasses: "w-full items-center",
          });
          dispatch(setUserLogin({ accessToken: "auth_tokenxxxx" }));
          navigate("/");
        }
      } catch (error) {
        console.log("error-in-signup", error);
        SimpleAlert({
          message: error.response.data.message,
          borderClasses: "border-b-2 border-red-400",
          wrapperClasses: "inset-x-0 top-0 flex w-full z-[1000]",
          alignmentClasses: "w-full items-center",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center text-gray-700 text-2xl font-bold mb-2">
            Login
          </div>
          <div class="mb-4 mt-10">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className={classNames(
                isUsername ? "border-red-500 placeholder:text-red-300" : "",
                "shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              )}
              id="username"
              type="text"
              placeholder="Please enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isUsername && (
              <p className="text-red-500 text-xs italic">
                Please enter username.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className={classNames(
                isPassword ? "border-red-500 placeholder:text-red-300" : "",
                "shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              )}
              id="password"
              type="password"
              placeholder="Please enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPassword && (
              <p className="text-red-500 text-xs italic">
                Please enter password.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Login
            </button>
            <p className="inline-block align-baseline font-bold text-xs">
              Don't have an account yet?{" "}
              <span
                className="text-blue-500 ml-1 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;Authentication System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
