import React, { useEffect, useState } from 'react';
import styles from './upcominghackathons.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpcomingHackathon = () => {
    const [hackathon, setHackathon] = useState({});
    const { hackathonName } = useParams(); // Extract the hackathon name from the URL
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/home/team-details"); // Navigate to team details page on button click
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/hackathon/${hackathonName}`); // Fetch hackathon details based on hackathonName
                setHackathon(response.data); // Set the response data to state
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
                       
                       {new Date(hackathon.registration?.deadline).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <p><strong>Hackathon Name:</strong> {hackathon.name}</p>
                        <p><strong>Location:</strong> {hackathon.location}</p>
                        <p><strong>Description:</strong> {hackathon.description}</p>
                        <p><strong>Eligibility:</strong> {hackathon.eligibility}</p>
                        <p><strong>Start Date:</strong> {new Date(hackathon.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(hackathon.endDate).toLocaleDateString()}</p>
                        <p><strong>Max Members:</strong> {hackathon.teamSize?.max}</p>
                        <p><strong>Min Members:</strong> {hackathon.teamSize?.min}</p>
                        
                        <p><strong>Prizes:</strong></p>
                        <ul>
                            {hackathon.prizes?.map((prize, index) => (
                                <li key={index}>{prize.name} - ${prize.money}</li>
                            ))}
                        </ul>
                        <p><strong>Organizers:</strong></p>
                        <ul>
                            {hackathon.organizers?.map((v, index) => (
                                <li key={index}>{v.name} </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Enroll Button */}
                <button className={styles.enrollbtn} onClick={handleNavigate}>Enroll Now</button>
            </div>
        </>
    );
}

export default UpcomingHackathon;
