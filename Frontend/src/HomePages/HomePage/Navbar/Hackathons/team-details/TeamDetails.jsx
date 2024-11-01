import React, { useState } from 'react';
import styles from './TeamDetails.module.css';
import axios from 'axios';

const TeamDetails = () => {
    const [modal, setModal] = useState(false);
    const [searchname, setSearchname] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    const handleAddMembers = (e) => {
        e.preventDefault(); 
        setModal(true); 
    };

    const closeModal = () => {
        setModal(false); 
        setRecommendations([]); 
    };

    const handleChange = async (e) => {
        const name = e.target.value;
        setSearchname(name);

        if (name.length > 2) {
            try {
                const response = await axios.get(`http://localhost:3000/add-member/search/?name=${name}`);
                setRecommendations(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setRecommendations([]); 
        }
    };

    const handleInvite=()=>{
alert("invite sent ")
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
                    <button type="submit" onClick={handleAddMembers} className={styles.button}>Add Members</button>
                </form>

                {modal && (
                    <>
                        <div className={styles.modalBackground} onClick={closeModal}></div>
                        <div className={styles.modalOverlay}>
                            <button className={styles.crossBtn} onClick={closeModal}>&times;</button>
                            <p>Invite members to your team</p>
                            <input
                                type="text"
                                placeholder="Member name"
                                value={searchname}
                                onChange={handleChange}
                            />
                            <div className={styles.recommendationlist}>
                                {recommendations.length > 0 ? (
                                    recommendations.map((item) => (
                                        <div className={styles.item} key={item._id}>
                                            <span>{item.name}</span>
                                            <button onClick={handleInvite}>Invite</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No users found</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamDetails;
