import React, { useContext, useEffect, useState } from "react";
import "./notification.scss";
import Socketcontext from "../../../Context/SocketContext";
import Usercontext from "../../../Context/Usercontext";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // Change state to an array
  const { socket } = useContext(Socketcontext);
  const { Userinfo } = useContext(Usercontext);

  const FetchNotificaion = async () => {
    try {
      const reponse = await axios.get(
        `http://localhost:3000/home/userdata/${Userinfo.email}`
      );
      setNotifications(reponse.data.userNotification);
    } catch (error) {
      console.log("fetching of notification is failed", error);
    }
  };
  useEffect(() => {
    console.log("fetching notification");
    FetchNotificaion();
  }, []);

  useEffect(() => {
    // Listen for notifications from the server
    socket?.on("getNotification", () => {
      FetchNotificaion();
    });
  }, [socket]);

  return (
    <div className="not-container">
      <h3>Notifications</h3>
      <hr className="light-line" />

      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notif, index) => (
            <li key={index} className="notification-item">
              <p>{notif.message}</p>
              <small>{new Date(notif.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No notifications available</p>
      )}
    </div>
  );
};

export default Notifications;
