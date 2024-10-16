import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
// import "../components/navbar/navbar.scss"
import { Outlet } from "react-router-dom";

function Home(){
  useEffect(() =>{
   const queryParams = new URLSearchParams(window.location.search);
   const token = queryParams.get('token');
   if(token) {
    sessionStorage.setItem('token' , token);
   }
  },[])
  return<>
  <Navbar/>
  <Outlet/>
  </>
}
export default Home;
