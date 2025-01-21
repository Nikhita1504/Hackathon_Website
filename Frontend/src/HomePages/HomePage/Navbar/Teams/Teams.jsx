import React, { useEffect, useState } from "react";
import styles from "./Teams.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const Teams = () => {
  const [teams, setteams] = useState([]);
  const navigate=useNavigate();


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    let token = queryParams.get('token');
    if (token) {
      sessionStorage.setItem('token', token)

    }
    else {
      token = sessionStorage.getItem('token', token);
    }
    const payload = jwtDecode(token)


    const fetchTeamData = async () => {
      const response = await axios.get(`http://localhost:3000/team/teams-list/${payload.user.email}`)
      setteams(response.data);
    }
    fetchTeamData();
  }, [setteams])

  const handleNavigate=(team)=>{

    navigate("/home/teams/view-details",{state:{teamData:team}})
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Enrolled Teams</h1>
      <div className={styles.cards}>
        {teams.map((team, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.status} style={{
              backgroundColor:   "#F5F573" ,
            }}>
              Not Completed
            </div>
            <div className={styles.team_details}>
              <h2 className={styles.teamName}>{team.teamName}</h2>
              <p className={styles.hackathonName}>
                <strong>Hackathon:</strong> {team.hackathonId.name}
              </p>
            </div>
            <button  onClick={()=>handleNavigate(team)} className={styles.button}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
