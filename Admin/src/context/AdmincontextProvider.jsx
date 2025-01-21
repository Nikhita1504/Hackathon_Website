import React, { useState , useEffect} from "react";

import Admincontext from "./Admincontext"

const AdminProvider = ({children}) =>{
  const[Admininfo , SetAdmininfo] = useState(() => {
   const storedData = sessionStorage.getItem("Admininfo");
   return storedData ? JSON.parse(storedData) :{}
   })

  return(
   <Admincontext.Provider value={{ Admininfo,SetAdmininfo }}>
      {children}
   </Admincontext.Provider>)
}
export default AdminProvider;