import React from "react";
import styles from "./ViewDetails.module.css";
import { useLocation } from "react-router-dom";

function ViewDetails() {
  const location = useLocation();
  const teamData = location.state?.teamData;
  console.log(teamData._id);
  const handleLeave = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.hackathonTitle}>{teamData.hackathonId.name}</h1>
        <p className={styles.organizer}>John Doe</p>

        <div className={styles.teamSection}>
          <h3>
            Team Name:{" "}
            <span className={styles.teamName}>{teamData.teamName}</span>
          </h3>
          <p className={styles.teammates}>
            Teammates: {teamData.members.length}/
            {teamData.hackathonId.teamSize.max}
          </p>
        </div>

        <p className={styles.additionalInfo}>
          You can add up to 3 additional members
        </p>

        {teamData.members.length > 0 ? (
          teamData.members.map((member) => (
            <div className={styles.memberCard}>
              <div className={styles.avatar}>
                {member.user.profilePicture ? (
                  <img src={member.user.profilePicture} alt="" />
                ) : (
                  <img src="/assets/uploadpic .png" alt="" />
                )}
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>
                  {member.user.name || "No Username"}
                </p>
                <p className={styles.memberDetails}>
                  {member.user.college || "College not available"} |{" "}
                  {member.user.degree || "Degree not available"} |
                  {member.user.GraduationYear ||
                    "Graduation Year not available"}
                </p>
              </div>
              <button className={styles.memberRole}>
                {member.role
                  ? member.role.charAt(0).toUpperCase() + member.role.slice(1)
                  : ""}
              </button>
            </div>
          ))
        ) : (
          <p>No team members found</p>
        )}
        <button className={styles.leavebutton} onClick={handleLeave}>
          Leave
        </button>
      </div>
    </div>
  );
}

export default ViewDetails;
