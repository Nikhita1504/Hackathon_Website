import { useEffect } from "react";
import Navbar from "./HomePage/Navbar/Navbar";
// import "../components/navbar/navbar.scss"
import { Outlet } from "react-router-dom";

function Home(){
 
  useEffect(() => {
    console.log("Home component useEffect running");
  }, []);
  
  return<>
  <Navbar/>
  <Outlet/>
  </>
}
export default Home;
