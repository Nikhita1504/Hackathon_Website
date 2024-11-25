import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ViewNotification.scss";
import { useNavigate } from "react-router-dom";
const ViewNotification = ({ setIsFloatingVisible, Details }) => {
  const [InviteDetails, SetInviteDetails] = useState(null);
  const navigate = useNavigate();



  const handlecloseNotification = () => {
    setIsFloatingVisible(false);
  };
  const handleAccept = () => {

  }
  const handleDecline = () => {

  }

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/team/${Details.teamId}`
      );
      console.log(response.data);
      SetInviteDetails(response.data);

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
      {console.log('a', InviteDetails?.members[0].user.name || "S")}
      <div className="Notification-Details-container">
        <h3 >{InviteDetails?.hackathonId.name}</h3>
        <h8>{InviteDetails?.hackathonId.description}</h8>
        <h3>
          TeamName:<span>{InviteDetails?.teamName}</span>
        </h3>
        {InviteDetails?.members?.map((value) => (
          <div className="memberCard" key={value._id}>
            <div className="memberAvatar">
              {value.user?.name ? value.user.name : "?"}
            </div>
            <div>
              <div className="memberInfo">
                <p className="memberName" onClick={() => handleNavigate(value.user.email)}>
                  {value.user.name || "Unknown"}
                </p>
                <p className="memberCollege">
                  {value.user.college || "College not available"}
                </p>
                <p className="memberDegree">
                  {value.user.degree || "Degree not available"}
                </p>
                <p className="memberYear">
                  {value.user.GraduationYear || ""}
                </p>
               
              </div>
              <button className="memberRole">
                {value.role
                  ? value.role.charAt(0).toUpperCase() + value.role.slice(1)
                  : ""}
              </button>
            </div>
          </div>
        ))}<button onClick={handlecloseNotification}>back</button>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default ViewNotification;
