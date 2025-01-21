import { useEffect, useState, useContext } from "react";
import Socketcontext from "./SocketContext";
import Usercontext from "./Usercontext";
import { io } from "socket.io-client";

const SocketProvider = ({ children }) => {
  const [socket, Setsocket] = useState(null);

  const { Userinfo } = useContext(Usercontext);
  const [loggedIn, SetloggedIn] = useState(() =>{
    const token = sessionStorage.getItem("token");
    return token? true:false;
  });

  // Initialize socket connection
  useEffect(() => {
    if (socket == null && loggedIn) {
      try {
        const newSocket = io("http://localhost:3000");
        sessionStorage.setItem("SocketID", newSocket.id); 
        Setsocket(newSocket);
      } catch (e) {
        console.log("Socket connection error:", e);
      }
    }

  }, [loggedIn]);

  // Emit new user when socket is ready
  useEffect(() => {
    if (socket) {
      socket.emit("newUser", Userinfo.email);
    }
  }, [socket, Userinfo.email]);

  return (
    <Socketcontext.Provider value={{ socket, Setsocket, loggedIn, SetloggedIn }}>
      {children}
    </Socketcontext.Provider>
  );
};

export default SocketProvider;
