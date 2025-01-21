import React, { useState , useEffect} from "react";

import Usercontext from "./Usercontext"

const UserProvider = ({children}) =>{
  const[Userinfo , SetUserinfo] = useState(() => {
   const storedData = sessionStorage.getItem("Userinfo");
   console.log("stored data" , storedData)
   return storedData ? JSON.parse(storedData) :{
      name:"",
      email:"",
      password:"",
      college:"",
      degree:"",
      GraduationYear:"",
      skills:"",
      bio:"",
      githubProfile:"",
      linkedinProfile:"",
   }
   
  })
  useEffect(() => {
   sessionStorage.setItem("Userinfo", JSON.stringify(Userinfo));
}, [Userinfo]);

  return(
   <Usercontext.Provider value={{Userinfo , SetUserinfo}}>
      {children}
   </Usercontext.Provider>)
}
export default UserProvider;