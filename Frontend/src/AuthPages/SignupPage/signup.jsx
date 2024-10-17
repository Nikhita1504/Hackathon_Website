import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState , useContext } from "react";
import { handleError, handleSucess } from "../../Utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercontext from "../../Context/Usercontext";

function Signup() {
  const {Userinfo , SetUserinfo} = useContext(Usercontext);
  const navigate = useNavigate();



  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyinfo = { ...Userinfo};
    copyinfo[name] = value;
    SetUserinfo(copyinfo);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = Userinfo;

    if (!name || !email || !password) {
      handleError("name ,email , password required");
      return;
    }

    try {
      const URL = "http://localhost:3000/auth/signup";
       const body = {name,email,password}
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      const { success, error, message, jwt_token } = result;

      if (success) {
        sessionStorage.setItem("token", jwt_token);
        handleSucess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
        SetUserinfo({name,email,password})
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
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Signup</h1>
        <form className={styles.form} onSubmit={handlesubmit}>
          <div>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className={styles.input}
              onChange={handlechange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              onChange={handlechange}
              type="text"
              name="email"
              autoFocus
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              onChange={handlechange}
              type="text"
              name="password"
              autoFocus
              placeholder="Enter passwored"
            />
          </div>

          <button className={styles.signup}>Signup</button>
          <span className={styles.span}>
            Already have an account?
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </span>
          <div className={styles.divider}>or</div>

          <div className={styles.googlediv}>
            <a
              className={styles.googleButton}
              href="http://localhost:3000/google/auth/signup"
            >
              <img
                className={styles.googleIcon}
                src="/assets/googles.png"
                alt="Google logo"
              />
              sign up with google
            </a>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
export default Signup;
