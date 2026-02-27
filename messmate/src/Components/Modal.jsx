import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../Api/axios.js";
import useAuth from "../Auth/useAuth";
import closeBtnpic from "../Svg/close.svg";
import Alert from "./Alert";

const Email_Checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Modal({ setLoginmodal }) {
  const { setAuth } = useAuth();
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "",
  });
  // navigate and set or exist path take
  const location = useLocation();
  const navigate = useNavigate();

  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState("");
  // const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [oldpassword, setoldPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // // validation in all fields
  // useEffect(() => {
  //   setValidEmail(Email_Checker.test(email));
  // }, [email]);

  useEffect(() => {
    setValidPassword(true);
  }, [password]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [email, password]);

  // handling submit
  const handleReset = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const e1 = Email_Checker.test(email);
    // const e2 = validPassword;
    if (!e1) {
      // setErrMsg("Invalid Entry");
      setalert({
        mode: true,
        message: "Invalid Entry",
        type: "bg-[red]",
      });
      return;
    }
    try {
      const response = await axios.patch(
        "/users/resetpasswd",
        JSON.stringify({ email, oldpassword, newpassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // navigate to where it comes from
      setoldPassword("");
      setnewPassword("");
      setReset(false);
      if (response.data) {
        setalert({
          mode: true,
          message: "Reset Password",
          type: "bg-[green]",
        });
      }
    } catch (err) {
      if (!err?.response) {
        setalert({
          mode: true,
          message: "No server response. Please check your connection.",
          type: "bg-red-500",
        });
      } else if (err.response?.status === 409) {
        setalert({
          mode: true,
          message: "User not found. Please check your email.",
          type: "bg-red-500",
        });
      } else if (err.response?.status === 401) {
        setalert({
          mode: true,
          message: "Old password is incorrect.",
          type: "bg-red-500",
        });
      } else {
        setalert({
          mode: true,
          message: err.response?.data?.message || "Password reset failed.",
          type: "bg-red-500",
        });
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs before API call
    const isValidEmail = Email_Checker.test(email);

    if (!email) {
      setalert({
        mode: true,
        message: "Please enter your email address.",
        type: "bg-orange-400",
      });
      return;
    }

    if (!isValidEmail) {
      setalert({
        mode: true,
        message: "Please enter a valid email address.",
        type: "bg-orange-400",
      });
      return;
    }

    if (!password) {
      setalert({
        mode: true,
        message: "Please enter your password.",
        type: "bg-orange-400",
      });
      return;
    }
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userId = response.data.userId;
      const name = response.data.name;
      const newEmail = response.data.email;
      const mobileno = response.data.mobileno;
      const accessToken = response.data.accessToken;
      const role = response.data.role;

      // setAuth on login
      setAuth({ userId, name, email: newEmail, mobileno, role, accessToken });

      // navigate to where it comes from
      setLoginmodal(false);
      navigate(
        role === 0
          ? "/user"
          : role === 1
          ? "/admin"
          : role === 2
          ? "/employee"
          : "/unauthorized",
        {
          replace: true,
        }
      );
    } catch (err) {
      if (!err?.response) {
        setalert({
          mode: true,
          message: "No server response. Please check your connection.",
          type: "bg-red-500",
        });
      } else if (err.response?.status === 400) {
        setalert({
          mode: true,
          message: "Please fill in all fields",
          type: "bg-orange-400",
        });
      } else if (err.response?.status === 401) {
        const serverMessage = err.response?.data?.message;
        if (serverMessage === "User not available") {
          setalert({
            mode: true,
            message: "User not found. Please check your email.",
            type: "bg-red-500",
          });
        } else if (serverMessage === "Unauthorized") {
          setalert({
            mode: true,
            message: "Incorrect password. Please try again.",
            type: "bg-red-500",
          });
        } else {
          setalert({
            mode: true,
            message: serverMessage || "Login failed. Please try again.",
            type: "bg-red-500",
          });
        }
      } else {
        setalert({
          mode: true,
          message: err.response?.data?.message || "Something went wrong",
          type: "bg-red-500",
        });
      }
    }
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={() => setLoginmodal(false)}
      />

      <div className="flex fixed left-[35%] min-w-[30%] max-w-[31%]   transform overflow-hidden  p-10  bg-white rounded-lg   flex-col    md:mt-0 ">
        <div className="flex">
          <h2 className="grow h-14 text-black text-3xl text-center font-medium title-font mb-2">
            Login
          </h2>
          <div class="flex-none ">
            <img
              src={closeBtnpic}
              alt=""
              className=" cursor-pointer min-h-[35px] min-w-[35px] mt-1"
              onClick={() => setLoginmodal(false)}
            />
          </div>
        </div>
        {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        {!reset ? (
          <form>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="text-black bg-gradient-to-r from-[#ED765E] to-[#FDB777] border-2 hover:bg-gradient-to-t hover:from-[#FDB777] hover:to-[#ED765E]  border-black font-semibold text-xl  mt-4 py-2 px-8 focus:outline-none rounded "
              >
                Login
              </button>
            </div>
          </form>
        ) : (
          <form>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Old Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setoldPassword(e.target.value)}
                value={oldpassword}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Set New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setnewPassword(e.target.value)}
                value={newpassword}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              onClick={handleReset}
              className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Reset Password
            </button>
          </form>
        )}
        {!reset ? (
          <div>
            <button
              className=" mt-4 text-[1rem] text-indigo-600"
              onClick={() => setReset(true)}
            >
              Reset Password...
            </button>
          </div>
        ) : (
          <div>
            <button
              className=" mt-3 text-[1rem] text-indigo-600"
              onClick={() => setReset(false)}
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Modal;
