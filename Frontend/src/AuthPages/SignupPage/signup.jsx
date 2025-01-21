import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { handleError, handleSucess } from "../../Utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercontext from "../../Context/Usercontext";
import SocketContext from "../../Context/SocketContext";
function Signup() {
  const { Userinfo, SetUserinfo } = useContext(Usercontext);
  const navigate = useNavigate();
  const { SetloggedIn} = useContext(SocketContext)
  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyinfo = { ...Userinfo };
    copyinfo[name] = value;
    SetUserinfo(copyinfo);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = Userinfo;

    if (!name || !email || !password) {
      handleError("Name, email, and password are required.");
      return;
    }

    try {
      const URL = "http://localhost:3000/auth/signup";
      const body = { name, email, password };
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      const { success, error, message, jwt_token } = result;

      if (success) {
        SetloggedIn(true);
        sessionStorage.setItem("token", jwt_token);
        handleSucess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
        SetUserinfo({ name, email, password });
      } else if (error) {
        const details = error.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupContent}>
        <div className={styles.illustration}>
          <video src="/assets/loginmv.mp4" autoPlay loop muted className={styles.video} />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Signup</h1>
          <form className={styles.form} onSubmit={handlesubmit}>
            <div>
              <label className={styles.label} htmlFor="name">Name</label>
              <input id="name" className={styles.input} onChange={handlechange} type="text" name="name" placeholder="Enter your name" />
            </div>
            <div>
              <label className={styles.label} htmlFor="email">Email</label>
              <input id="email" className={styles.input} onChange={handlechange} type="text" name="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className={styles.label} htmlFor="password">Password</label>
              <input id="password" className={styles.input} onChange={handlechange} type="password" name="password" placeholder="Enter password" />
            </div>
            <button className={styles.signup}>Signup</button>
            <span className={styles.span}>
              Already have an account? <Link className={styles.link} to="/login">Login</Link>
            </span>
            <div className={styles.divider}>or</div>
            <div className={styles.googlediv}>
              <a className={styles.googleButton} href="http://localhost:3000/google/auth/signup">
                <img className={styles.googleIcon} src="/assets/googles.png" alt="Google logo" /> Sign up with Google
              </a>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
