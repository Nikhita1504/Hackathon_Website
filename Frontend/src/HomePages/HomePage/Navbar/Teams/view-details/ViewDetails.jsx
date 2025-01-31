import React, { useEffect, useState } from "react";
import styles from "./ViewDetails.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ViewDetails() {
    const location = useLocation();
    const teamData = location.state?.teamData;
    console.log(teamData.members)
    const [teamMembers, setTeamMembers] = useState([])
    const [leaveModal, setLeaveModal] = useState(false);
    const [modal, setmodal] = useState(false);

    const fetchTeamData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/team/team-details/${teamData._id}`);
            const members = response.data.members;

            setTeamMembers(members);

        } catch (error) {
            console.log('Error fetching team data:', error);

        }
    };
    useEffect(() => {
        fetchTeamData();
        const intervalId = setInterval(() => {
            fetchTeamData();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [setTeamMembers])


    const filterMembers = teamMembers.filter((member) => member.role === "member");
    console.log(filterMembers);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.hackathonTitle}>{teamData.hackathonId.name}</h1>
                    <p className={styles.organizer}>John Doe</p>

                    <div className={styles.teamSection}>
                        <h3>
                            Team Name: <span className={styles.teamName}>{teamData.teamName}</span>
                        </h3>
                        <p className={styles.teammates}>Teammates: {teamData.members.length}/{teamData.hackathonId.teamSize.max}</p>
                    </div>

                    <p className={styles.additionalInfo}>You can add up to 3 additional members</p>

                    {
                        teamMembers.length > 0 ? (
                            teamMembers.map((member) => (
                                <div className={styles.memberCard}>
                                    <div className={styles.avatar}>{
                                        member.user.profilePicture ? (<img src={member.user.profilePicture} alt="" />) : (<img src="/assets/uploadpic .png" alt="" />)
                                    }</div>
                                    <div className={styles.memberInfo}>
                                        <p className={styles.memberName}>{member.user.name || "No Username"}</p>
                                        <p className={styles.memberDetails}>
                                            {member.user.college || "College not available"} | {member.user.degree || "Degree not available"} |
                                            {member.user.GraduationYear || "Graduation Year not available"}
                                        </p>
                                    </div>
                                    <button className={styles.memberRole}>
                                        {member.role ? member.role.charAt(0).toUpperCase() + member.role.slice(1) : ""}
                                    </button>
                                    
                                </div>

                            ))
                        ) : (<p>No team members found</p>)
                    }
                    {/* <button
                                        onClick={() => setmodal(!modal)}
                                        className={styles.deleteTeamBtn}
                                    >
                                        Delete Team
                                    </button> */}
                </div>
            </div>
            {/* delete team 
            {modal && (
                <div className={styles.modalBg}>
                    <div className={styles.modal}>
                        <h3>Are you sure you want to delete this team?</h3>
                        <div className={styles.modalButtons}>
                            <button
                                onClick={() => handleDeleteTeam(teamData._id)}
                                className={styles.confirmButton}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setmodal(false)}
                                className={styles.cancelButton}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {leaveModal && (
                <div className={styles.modalBg}>
                    <div className={styles.modal}>
                        <h3>Are you sure you want to leave this team?</h3>
                        <div className={styles.modalButtons}>
                            <button
                                onClick={() => handleLeave(Userinfo._id, teamData._id)}
                                className={styles.confirmButton}
                            >
                                Yes, Leave
                            </button>
                            <button
                                onClick={() => setLeaveModal(false)}
                                className={styles.cancelButton}
                            >
                                No, Stay
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
}

export default ViewDetails;
