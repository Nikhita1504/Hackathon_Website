import React, { useContext, useEffect, useState } from 'react';
import styles from './upcominghackathons.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HackathonContext from '../../../../../Context/HackathonContext';

const UpcomingHackathon = () => {
    const { hackathonDetails, setHackathonDetails } = useContext(HackathonContext);
    // console.log(hackathonDetails)

    const { hackathonName } = useParams(); 
    const navigate = useNavigate();

    const handleNavigate = (hackathonName,e) => {
        navigate(`/home/hackathons/${hackathonName}/team-details`, { state: { hackathonName } }); 
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/hackathon/${hackathonName}`); 
                
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
                    <div className={styles.left}>
                        <img src={"/assets/logo1.jpg"} className={styles.logo} alt="Hackathon Logo" />
                        <div className={styles.deadlinecontainer}>
                        <p className={styles.lastdate}><strong>Last Date to Apply:</strong>
                       
                       {new Date(hackathonDetails.registration?.deadline).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <p><strong>Hackathon Name:</strong> {hackathonDetails.name}</p>
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

export default UpcomingHackathon;
