import React, { useContext, useEffect, useState } from 'react';
import styles from './HackathonDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HackathonContext from '../../../../../Context/HackathonContext';
import {jwtDecode} from 'jwt-decode'

const HackathonDetails = () => {
    const { hackathonDetails, setHackathonDetails } = useContext(HackathonContext);
    

    const { hackathonName } = useParams(); 
    const navigate = useNavigate();

    const handleNavigate = async (hackathonName) => {
        try{
            const token = sessionStorage.getItem('token');
            const payload = jwtDecode(token);
            const URL = `http://localhost:3000/enroll/checkenroll/${payload.user.email}/${hackathonName}`;
            const response = await fetch(URL , {
                method:"GET",
                headers: {
                    "content-Type": "application/json",
                  },
            });
            const Response = await response.json()
            const teamData=Response.team

            if(Response.found){
                navigate(`/home/hackathons/${hackathonName}/team-details/add-member`, {
                    state: { hackathonName,teamData},
                  });
            }else{
                navigate(`/home/hackathons/${hackathonName}/team-details`, { state: { hackathonName } }); 
            }
        } catch(error){
            console.log(error)
        }
        
       
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/hackathon/${hackathonName}`); 
                console.log(response.data)
                
                setHackathonDetails(response.data); 
            } catch (error) {
                console.error("Error fetching hackathon data:", error);
            }
        };
        fetchData();
    }, [hackathonName]);

    return (
        <>
            <div className={styles.container}>
                <img src="/assets/hackathonbanner.png" className={styles.img} alt="Hackathon Banner" />


                <div className={styles.detailsbox}>
                <h2>{hackathonDetails.name}</h2>

                    <div className={styles.left}>
                        <img src={"/assets/hackathonbanner2.webp"} className={styles.logo} alt="Hackathon Logo" />
                        <div className={styles.deadlinecontainer}>
                        <p className={styles.lastdate}><strong>Last Date to Apply:</strong>
                       
                       {new Date(hackathonDetails.registration?.deadline).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <p><strong>Location:</strong> {hackathonDetails.location}</p>
                        <p><strong>Description:</strong> {hackathonDetails.description}</p>
                        <p><strong>Eligibility:</strong> {hackathonDetails.eligibility}</p>
                        <p><strong>Start Date:</strong> {new Date(hackathonDetails.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(hackathonDetails.endDate).toLocaleDateString()}</p>
                        <p><strong>Max Members:</strong> {hackathonDetails.teamSize?.max}</p>
                        <p><strong>Min Members:</strong> {hackathonDetails.teamSize?.min}</p>
                        
                        <p><strong>Prizes:</strong></p>
                        <ul>
                            {hackathonDetails.prizes?.map((prize, index) => (
                                <li key={index}>{prize.name} - ${prize.money}</li>
                            ))}
                        </ul>
                        <p><strong>Organizers:</strong></p>
                        <ul>
                            {hackathonDetails.organizers?.map((v, index) => (
                                <li key={index}>{v.name} </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Enroll Button */}
                <button className={styles.enrollbtn} onClick={(e)=> handleNavigate(hackathonDetails.name,e)}>Enroll Now</button>
            </div>
        </>
    );
}

export default HackathonDetails;
