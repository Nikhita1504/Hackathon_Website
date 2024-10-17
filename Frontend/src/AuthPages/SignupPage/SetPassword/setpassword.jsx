import React, { useContext  ,useEffect, useState} from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
import style from"./setpassword.module.css"
import Usercontext from '../../../Context/Usercontext';
import { handleError, handleSucess } from '../../../Utils/utils';
import {jwtDecode} from "jwt-decode"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Setpassword() {



  const navigate = useNavigate();
  const {Userinfo , SetUserinfo} = useContext(Usercontext)


  const [showPassword, setShowPassword] = useState(false);
  const[confirmpassword , Setconfirmpassword] = useState("")
  const location = useLocation();

   const getTokenFromUrl = () => {

    const params = new URLSearchParams(location.search); 
    return params.get('token'); 
  };

  useEffect(() => {
    const token = getTokenFromUrl(); 
    if (token) {
      const {email,name} = jwtDecode(token);
      Userinfo.email = email;
      Userinfo.name = name;
      // SetUserinfo(name)
     sessionStorage.setItem('token' , token); 

    }
  }, []); 

  

  const handleSubmit = async(e) =>{
    console.log("hello")
    e.preventDefault();
    if(Userinfo.password == confirmpassword){
     try{
      const URL = "http://localhost:3000/auth/signup";
      const{name , email , password} = Userinfo;
      console.log(password)
      const body ={name,email,password}
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      const { success, error, message } = result;

      if (success) {
        handleSucess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
     }catch(err){
      handleError(err);
     }
    }else{
      handleError("Password doesnot match")
    }

  }

 const handlePasswordChange = (e) =>{
  SetUserinfo({...Userinfo,password:e.target.value})
}


 const  handleConfirmPasswordChange  = (e) =>{
   Setconfirmpassword(e.target.value);
 }

 const togglePasswordVisibility = false;
  return (
   <div className={style.container}>
     <form onSubmit={handleSubmit} className={style.form}>
      <div>
        <label className={style.label} htmlFor="password">
          Set Password
        </label>
        <input
          id='password'
          className={style.input}
          // value={Userinfo.password}
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          name="password"
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div>
        <label className={style.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className={style.input}
          value={confirmpassword}
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>

      <div>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={()=>{
            setShowPassword(!showPassword)
          }}
        />
        <label className={style.label} htmlFor="showPassword">
          Show Password
        </label>
      </div>

      <button type="submit" className={style.button}>
        Set Password
      </button>
      <ToastContainer></ToastContainer>
    </form>
   
   </div>
  );
};
 


export default Setpassword
