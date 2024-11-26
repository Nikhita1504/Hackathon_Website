import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./ViewNotification.scss";
import { useNavigate } from "react-router-dom";
import Usercontext from "../../../../Context/Usercontext";
import SocketContext from "../../../../Context/SocketContext";
import "bootstrap/dist/css/bootstrap.css";

const ViewNotification = ({ setIsFloatingVisible, Details }) => {
  const [TeamDetail, SetTeamDetail] = useState(null);
  const { Userinfo } = useContext(Usercontext);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const handlecloseNotification = () => {
    setIsFloatingVisible(false);
  };
  const handleAccept = async () => {
    console.log("InviteDetails", TeamDetail);
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
      console.log("error in accepting invite", error);
    }
  };
  const handleDecline = async() => {
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
        `http://localhost:3000/team/${Details.teamId}`
      );
      console.log(response.data);
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
    <div className="floating-overlay">
      {console.log("a", TeamDetail?.members[0].user.name || "S")}
      <div className="Notification-Details-container">
        <h3>{TeamDetail?.hackathonId.name}</h3>
        <h8>{TeamDetail?.hackathonId.description}</h8>
        <h3>
          TeamName:<span>{TeamDetail?.teamName}</span>
        </h3>
        {TeamDetail?.members?.map((value) => (
          <div className="memberCard" key={value._id}>
            <div className="memberAvatar">
              {value.user?.name ? value.user.name : "?"}
            </div>
            <div>
              <div className="memberInfo">
                <p
                  className="memberName"
                  onClick={() => handleNavigate(value.user.email)}
                >
                  {value.user.name || "Unknown"}
                </p>
                <p className="memberCollege">
                  {value.user.college || "College not available"}
                </p>
                <p className="memberDegree">
                  {value.user.degree || "Degree not available"}
                </p>
                <p className="memberYear">{value.user.GraduationYear || ""}</p>
              </div>
              <button className="memberRole">
                {value.role
                  ? value.role.charAt(0).toUpperCase() + value.role.slice(1)
                  : ""}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          onClick={handlecloseNotification}
        ></button>
        <button onClick={handleAccept} type="button" class="btn btn-success">
          Accept
        </button>

        <button onClick={handleDecline} type="button" class="btn btn-danger">
          Decline
        </button>
      </div>
    </div>
  );
};

export default ViewNotification;
