import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usercontext from "../../../../Context/Usercontext";
import SocketContext from "../../../../Context/SocketContext";
import styles from "./ViewNotification.module.css"; // Import the module.css

import { handleError, handleSucess } from "../../../../utils/utils";
import { ToastContainer } from "react-toastify";

const ViewNotification = ({ setIsFloatingVisible, Details }) => {
  const [TeamDetail, SetTeamDetail] = useState(null);
  const { Userinfo } = useContext(Usercontext);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const handlecloseNotification = () => {
    setIsFloatingVisible(false);
  };

  const handleAccept = async () => {
    
    try {
      const data = {
        team_id: TeamDetail._id,
        newMember: { user: Userinfo._id },
      };
      console.log(data);
      const response = await axios.put(
        "http://localhost:3000/team/updateTeamMembers",
        data
      );
      const DeletedNotification = await axios.delete(
        `http://localhost:3000/Notification/delete/${Details.NotificationId}`
      );
      console.log("DeleteNotification", DeletedNotification.data);
      socket?.emit("DeleteNotification", Userinfo.email);
      handlecloseNotification();
    } catch (error) {
      if(error.response){
      handleError(error.response.data.message);
      console.log(error.response.data.message)
      }
    }
  };

  const handleDecline = async () => {
    try {
      const DeletedNotification = await axios.delete(
        `http://localhost:3000/Notification/delete/${Details.NotificationId}`
      );
      console.log("DeleteNotification", DeletedNotification.data);
      socket?.emit("DeleteNotification", Userinfo.email);
      handlecloseNotification();
    } catch (error) {
      console.log("error in declining invite", error);
    }
  };

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/team/team-details/${Details.teamId}`
      );
      console.log("team data", response.data);
      SetTeamDetail(response.data);
    } catch (error) {
      console.log("error in fetching team data", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, [Details]);

  const handleNavigate = (email) => {
    navigate("/home/view-profile", { state: { userEmail: email } });
  };

  return (
    <div className={styles.floatingOverlay}>
    <div className={styles.notificationDetailsContainer}>
      <div className={styles.header}>
        <div className={styles.hackatonDetails}>
          <h3>{TeamDetail?.hackathonId.name || "Hackathon Name"}</h3>
          <p>{TeamDetail?.hackathonId.description || "Description not available"}</p>
        </div>
        <button
          type="button"
          className={styles.closeBtn}

          onClick={handlecloseNotification}
        >&#10006;</button>
      </div>
      <div className={styles.teamDetails}>
        <h3>
          TeamName: <span>{TeamDetail?.teamName || "Unknown"}</span>
        </h3>
        {TeamDetail?.members?.map((value) => (
          <div className={styles.memberCard} key={value._id}>
          <div className={styles.memberAvatar}>
            {
              value.user.profilePicture ? <img src={value.user.profilePicture } alt="Member Avatar" /> :<img src="assets/uploadpic .png" alt="Member Avatar" /> 
            }
            {/* <img src={value.user.profilePicture } alt="Member Avatar" /> */}
          </div>
          <div className={styles.memberInfo}>
            <p
              className={styles.memberName}
              onClick={() => handleNavigate(value.user.email)}
            >
              {value.user.name || "Unknown"}
            </p>
            <div className={styles.memberDetails}>
              <span>{value.user.college || "N/A"}</span>
              <span>{value.user.degree || "N/A"}</span>
              <span>{value.user.GraduationYear || "N/A"}</span>
            </div>
          </div>
          <button className={styles.memberRole}>
            {value.role.charAt(0).toUpperCase() + value.role.slice(1)}
          </button>
        </div>
        
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleAccept}
          type="button"
          className={styles.acceptButton}
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          type="button"
          className={styles.declineButton}
        >
          Decline
        </button>
        
      </div>
    </div>
    <ToastContainer />
  </div>
   
  
  );
};

export default ViewNotification;
