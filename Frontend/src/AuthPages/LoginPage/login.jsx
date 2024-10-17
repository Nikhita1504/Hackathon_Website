import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { handleError, handleSucess } from "../../Utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [logininfo, Setlogininfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyinfo = { ...logininfo };
    copyinfo[name] = value;
    Setlogininfo(copyinfo);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    console.log(!email, !password);
    if (!email || !password) {
      handleError("email , password required");
      return;
    }
    try {
      const URL = "http://localhost:3000/auth/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, error, message, jwt_token } = result;
      if (success) {
        sessionStorage.setItem("token", jwt_token);
        handleSucess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
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
        <h1 className={styles.header}>Login</h1>
        <form className={styles.form} onSubmit={handlesubmit}>
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
          <button className={styles.button}>Login</button>
          <span className={styles.span}>
            Doesn't have an account?
            <Link className={styles.link} to="/signup">
              signup
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
export default Login;
