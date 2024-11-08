import React, { useContext, useEffect, useState } from 'react';
import styles from './AddMember.module.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import HackathonContext from '../../../../../../Context/HackathonContext';

const AddMember = () => {
    const [recommendations, setRecommendations] = useState([]);
    const location = useLocation();
    const hackathonName = location.state?.hackathonName;
    const { hackathonDetails, setHackathonDetails } = useContext(HackathonContext);
    const [searchname, setSearchname] = useState("");

    const currentYear = new Date().getFullYear();
    const graduationYears = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3];


    const [college, setcollege] = useState([])
    const [degree, setdegree] = useState([])
    const [GraduationYear, setGraduationYear] = useState([])


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
    }, [hackathonName, setHackathonDetails]);

    const handleCollegeChange = (e) => {

        
    }


    const handleReset = () => {
        setcollege([]);
        setdegree([]);
        setGraduationYear([]);
    };




    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <h2 className={styles.hackathonTitle}>{hackathonDetails.name}</h2>
                    <p className={styles.institution}>Indian Institute of Technology (IIT), Gandhinagar</p>

                    <div className={styles.teamSection}>
                        <div className={styles.teamHeader}>
                            <h3 className={styles.teamName}>
                                Team Name: <span className={styles.teamNameHighlight}>Tech Savvies</span>
                            </h3>
                            <p className={styles.memberCount}>Teammates: 1/4</p>
                        </div>
                        <p className={styles.memberInfo}>You can add up to 3 additional members</p>
                        <div className={styles.memberCard}>
                            <div className={styles.memberAvatar}>N</div>
                            <div>
                                <p className={styles.memberName}>Nikhita Das</p>
                                <p className={styles.memberContact}>LNCT AIML 2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.filters}>
                        <div className={styles.header}>
                            <h3>Filter By:</h3>
                            <button onClick={handleReset}>Reset</button>
                        </div>

                        <p>Colleges</p>
                        {
                            ["LNCT", "LNCTS", "LNCTE"].map((value) => (
                                <div className={styles.filterCategory}>

                                    <label>
                                        <input type="checkbox" name="" value={college}
                                            onChange={handleCollegeChange}
                                            id="" />
                                        {value}</label>
                                </div>
                            ))
                        }
                        <p>Branches</p>
                        {
                            ["CSE", "AIML", "AIDS", "IOT", "ME", "EC", "EE"].map((value) => (
                                <div className={styles.filterCategory}>

                                    <label>
                                        <input type="checkbox" name="" value={degree}
                                            onChange={(e) => setdegree(e.target.value)}

                                            id="" />
                                        {value}</label>
                                </div>
                            ))
                        }
                        <p>Year</p>
                        {
                            graduationYears.map((value) => (
                                <div className={styles.filterCategory}>

                                    <label>
                                        <input type="checkbox" name="" value={GraduationYear}
                                            onChange={(e) => setGraduationYear(e.target.value)}

                                            id="" />
                                        {value}</label>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles.searchContainer}>
                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Search team members..."
                                value={searchname}
                                // onChange={handleSearch}
                                className={styles.searchInput}
                            />
                        </div>
                        <div className={styles.recommendationlist}>
                            {recommendations.length > 0 ? (
                                recommendations.map((item) => (
                                    <div className={styles.item} key={item._id}>
                                        <div>
                                            <span>{item.name}</span>
                                            <span className={styles.itemborder}>{item.college}</span>
                                            <span className={styles.itemborder}>{item.degree}</span>
                                            <span className={styles.itemborder}>{item.GraduationYear}</span>
                                        </div>
                                        <button onClick={handleInvite}>Invite</button>
                                    </div>
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.backButton}>Back</button>
                <button className={styles.completeRegistrationButton}>Complete Registration</button>
            </div>
        </>
    );
};

export default AddMember;
