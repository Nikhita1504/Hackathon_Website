import styles from "./login.module.css";
import {  useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { handleError, handleSucess } from "../utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  Admincontext from "../context/Admincontext";
import axios from "axios";

function Login() {
  const { SetAdmininfo } = useContext(Admincontext);

  const [logininfo, Setlogininfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    Setlogininfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    if (!email || !password) {
      handleError("email , password required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/Admin/login",{...logininfo});
     
      const { success, error, message, jwt_token, Admin } = response.data;
      if (success) {
        sessionStorage.setItem("token", jwt_token);
        sessionStorage.setItem("Admininfo", Admin);
        SetAdmininfo(Admin)

        handleSucess(message);
        setTimeout(() => {
          console.log("login successfull");
          // navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.log(error)
      handleError(error.response.data.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginbanner}>
        {/* Left video section */}
        <div className={styles.loginbannerVideo}>
          <video autoPlay loop muted className={styles.video}>
            <source src="/assets/loginmv.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Right form section */}
        <div className={styles.container}>
          <h1 className={styles.header}>Welcome!</h1>
          <p className={styles.subheader}>Sign in to your Account</p>
          <form className={styles.form} onSubmit={handlesubmit}>
            <input
              className={styles.input}
              onChange={handlechange}
              type="text"
              name="email"
              placeholder="Email Address"
            />
            <input
              className={styles.input}
              onChange={handlechange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
