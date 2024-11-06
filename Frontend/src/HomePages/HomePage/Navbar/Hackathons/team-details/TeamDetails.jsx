import React, { useContext, useEffect, useState } from 'react';
import styles from './TeamDetails.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import HackathonContext from '../../../../../Context/HackathonContext';

const TeamDetails = () => {

    const location = useLocation();
    const hackathonName = location.state?.hackathonName;
    console.log(hackathonName)

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/home/hackathons/${hackathonName}/team-details/add-member`,{ state: { hackathonName } })
    }

     return (
        <div className={styles.bigcontainer}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Enroll Your Team for the Hackathon</h2>
                <p className={styles.description}>
                    Join us for an exciting hackathon where innovation meets creativity. Fill in the details below to enroll your team.
                </p>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="teamName">Team Name</label>
                        <input type="text" id="teamName" placeholder="Enter your team name" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="yourName">Your Name</label>
                        <input type="text" id="yourName" placeholder="Enter your name" />
                    </div>
                    <button type="submit" onClick={handleNavigate} className={styles.button}>Next</button>
                </form>


            </div>
        </div>
    );
};

export default TeamDetails;
