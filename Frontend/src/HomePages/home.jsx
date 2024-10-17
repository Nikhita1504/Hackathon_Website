import { useEffect } from "react";
import Navbar from "./HomePage/HomePage";
// import "../components/navbar/navbar.scss"
import { Outlet } from "react-router-dom";

function Home(){
  useEffect(() =>{
    console.log("useEffect is running");
   const queryParams = new URLSearchParams(window.location.search);
   console.log(window.location.search); 
   const token = queryParams.get('token');
   console.log(token)
   if(token) {
    sessionStorage.setItem('token' , token);
   }
  },[])
 
  useEffect(() => {
    console.log("Home component useEffect running");
  }, []);
  
  return<>
  <Navbar/>
  <Outlet/>
  </>
}
export default Home;
