import React, { useContext, useEffect, useState } from 'react';
import styles from './HackathonDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HackathonContext from '../../../../../Context/HackathonContext';
import { jwtDecode } from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';

const HackathonDetails = () => {
    const { hackathonDetails, setHackathonDetails } = useContext(HackathonContext);


    const { hackathonName } = useParams();
    const navigate = useNavigate();

    const handleNavigate = async (hackathonName) => {
        try {
            const token = sessionStorage.getItem('token');
            const payload = jwtDecode(token);
            const URL = `http://localhost:3000/enroll/checkenroll/${payload.user.email}/${hackathonName}`;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                },
            });
            const Response = await response.json()
            const teamData = Response.team

            if (Response.found) {
                navigate(`/home/hackathons/${hackathonName}/team-details/add-member`, {
                    state: { hackathonName, teamData },
                });
            } else {
                navigate(`/home/hackathons/${hackathonName}/team-details`, { state: { hackathonName } });
            }
        } catch (error) {
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
        <> <div className={styles.container}>
            {/* Topmost Banner */}
            <div className={styles.topBanner}>
                <img
                    src="/assets/hackathonbanner.png"
                    alt="Hackathon Top Banner"
                    className={styles.topBannerImage}
                />
            </div>


            <h2 className={styles.title}>{hackathonDetails.name}</h2>

            {/* Main Section */}
            <div className={styles.main}>

                <div className={styles.left}>
                    {/* Banner Image */}
                    <img
                        src="/assets/hackathonbanner2.webp"
                        alt="Hackathon Banner"
                        className={styles.banner}
                    />

                    {/* Hackathon Information */}
                    <div className={styles.hackathonInfo}>
                        {/* Hackathon Type Label */}
                        <span className={styles.label}>#BUILDAthon</span>

                        {/* Location and Date */}
                        <div className={styles.locationDate}>
                            <p className={styles.location}>
                                <i className="fas fa-map-marker-alt"></i>{hackathonDetails.location}
                            </p>
                            <p className={styles.date}>
                                <FontAwesomeIcon icon={faCalendarDays} /> Nov 15-17, 2024
                            </p>
                        </div>

                        {/* Hackathon Title */}
                        <h3 className={styles.hackathonTitle}>
                            World's Largest Mountain Hackathon
                        </h3>

                        {/* Description */}
                        <p className={styles.description}>
                            A 48-hour coding marathon for all tech enthusiasts. Join us for an
                            unforgettable experience of innovation and collaboration.
                        </p>

                        {/* Prize Section */}
                        {/* <div className={styles.prizes}>
      <i className="fas fa-trophy"></i> $5000 Grand Prize
    </div> */}
                    </div>
                </div>


                <div className={styles.right}>
                    {/* Event Info */}
                    <div className={styles.details}>
                        <div>
                            <h3>Event Details</h3>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} /> Location:{'        '}{hackathonDetails.location}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faCalendarDays} />  Date:{'        '}
                                {new Date(hackathonDetails.startDate).toLocaleDateString()} -


                                {new Date(hackathonDetails.endDate).toLocaleDateString()}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faUserCheck} />Eligibility:{'          '}{hackathonDetails.eligibility}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faUsers} />Team Size: {'        '}{hackathonDetails.teamSize?.min} -{' '}
                                {hackathonDetails.teamSize?.max} members
                            </p>
                        </div>
                        <div className={styles.detailsBox}>
                            <p>
                                <span >Last Date to Register:</span>{' '}
                                {new Date(hackathonDetails.registration?.deadline).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Prizes Section */}
                    <div className={styles.prizes}>
                        <h3>Prizes</h3>
                        <br />
                        {hackathonDetails.prizes?.map((prize, index) => (
                            <p>
                                {prize.name} - ${prize.money}
                            </p>
                        ))}

                    </div>

                    {/* Organizers */}
                    <div className={styles.organizers}>
                        <h3>Organizers</h3>

                        {hackathonDetails.organizers?.map((organizer, index) => (
                            <p> {organizer.name}</p>
                        ))}

                    </div>

                    <button
                        className={styles.registerButton}
                        onClick={(e) => handleNavigate(hackathonDetails.name, e)}
                    >
                        Register Now
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default HackathonDetails;
