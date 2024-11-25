import React, { useContext, useEffect, useState } from 'react';
import styles from './AddMember.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import HackathonContext from '../../../../../../Context/HackathonContext';
import SocketContext from "../../../../../../Context/SocketContext";
import Usercontext from "../../../../../../Context/Usercontext";
import skillOptions from '../../../../../../utils/Skillsoption';


const AddMember = () => {

    const {socket} = useContext(SocketContext)
    const{Userinfo} = useContext(Usercontext);
  
    const [recommendations, setRecommendations] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const location = useLocation();
    const teamData = location.state?.teamData;
    const hackathonName = location.state?.hackathonName;
    const { hackathonDetails, setHackathonDetails } = useContext(HackathonContext);
    const [searchname, setSearchname] = useState("");
    const [showColleges, setShowColleges] = useState(false);
    const [showBranches, setShowBranches] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [showSkills, setShowSkills] = useState(false);

  const currentYear = new Date().getFullYear();
  const graduationYears = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
  ];

    const [college, setCollege] = useState([]);
    const [degree, setDegree] = useState([]);
    const [GraduationYear, setGraduationYear] = useState([]);
    const [Skills, setSkills] = useState([]);

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

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/team/${teamData._id}`);
                // console.log(response.data.members)
                setTeamMembers(response.data.members);
            } catch (error) {
                console.error("Error fetching team data:", error);
            }
        };


        fetchTeamData();
        const intervalId = setInterval(fetchTeamData, 5000);


        return () => clearInterval(intervalId);
    }, [teamData._id]);


    const handleCollegeChange = (e) => {
        const { value, checked } = e.target;
        console.log(value);
        console.log(checked);
        setCollege((prev) =>
          checked ? [...prev, value] : prev.filter((college) => college !== value)
        );
      };
      const handleDegreeChange = (e) => {
        const { value, checked } = e.target;
        setDegree((prev) =>
          checked ? [...prev, value] : prev.filter((deg) => deg !== value)
        );
      };
    
        const handleSkillChange = (e) => {
            const { value, checked } = e.target;
            console.log(value);
            setSkills((prev) =>
                checked ? [...prev, value] : prev.filter((skill) => skill !== value)
            );
        };
      
        const handleYearChange = (e) => {
            const { value, checked } = e.target;
            const year = parseInt(value, 10); 
            setGraduationYear((prev) =>
                checked ? [...prev, year] : prev.filter((yr) => yr !== year)
            );
        };
        
    
        const handleReset = () => {
            setCollege([]);
            setDegree([]);
            setGraduationYear([]);
            setSkills([]);
            setSearchname("");
            setRecommendations([]);
        };
    
    

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get("http://localhost:3000/add-member/search", {
                params: {
                    name: searchname.length > 2 ? searchname : undefined,
                    college: college.length ? college : undefined,
                    degree: degree.length ? degree : undefined,
                    GraduationYear: GraduationYear.length ? GraduationYear : undefined,
                    skills: Skills.length ? Skills : undefined
                },
            });
            setRecommendations(response.data);

        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    useEffect(() => {
        if (searchname.length > 2 || college.length || degree.length || GraduationYear.length || Skills.length) {
            fetchRecommendations();
        } else {
            setRecommendations([]);
        }
    }, [searchname, college, degree, GraduationYear, Skills]);

  const handleInvite = (item) => { 
    console.log(item.email);
    socket.emit("SendNotification" ,Userinfo.email , item.email,`${Userinfo.name} invites you to join their team for the ${hackathonName} hackathon!`,{teamId:teamData._id}
)
  };

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(`/home/hackathons/${hackathonName}/team-details`);
  };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <h2 className={styles.hackathonTitle}>{hackathonDetails.name}</h2>
                    <p className={styles.institution}>
                        {hackathonDetails?.organizers?.[0]?.name || "N/A"}
                    </p>


                    <div className={styles.teamSection}>
                        <div className={styles.teamHeader}>
                            <h3 className={styles.teamName}>
                                Team Name: <span className={styles.teamNameHighlight}>{teamData.teamName}</span>
                            </h3>
                            <p className={styles.memberCount}>Teammates: {teamMembers.length}/{hackathonDetails?.teamSize?.max || 'N/A'}</p>
                        </div>
                        <p className={styles.memberCountP}>You can add up to 3 additional members</p>
                        {teamMembers.length > 0 ? (
                            teamMembers.map((value) => (
                                <div className={styles.memberCard} key={value._id}>
                                    <div className={styles.memberAvatar}>{value.user.name ? value.user.name[0] : "?"}</div>
                                    <div>
                                        <div className={styles.memberInfo}>
                                            <p className={styles.memberName}>{value.user.name || "Unknown"}</p>
                                            <p className={styles.memberCollege}>
                                                {value.user.college || "College not available"}
                                            </p>
                                            <p className={styles.memberDegree}>
                                                {value.user.degree || "Degree not available"}
                                            </p>
                                            <p className={styles.memberYear}>
                                                {value.user.GraduationYear || ""}
                                            </p>
                                        </div>
                                        <button className={styles.memberRole}>
                                            {value.role ? value.role.charAt(0).toUpperCase() + value.role.slice(1) : ""}
                                        </button>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No team members found</p>
                        )}

                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.filters}>
                        <div className={styles.header}>
                            <h3>Filter By:</h3>
                            <button onClick={handleReset}>Reset</button>
                        </div>


                        <p onClick={() => setShowColleges(!showColleges)}>Colleges</p>
                        <div className={`${styles.filterlist} ${showColleges ? styles.showfilterlist : ''}`}>
                            {["LNCT", "LNCTS", "LNCTE"].map((value) => (
                                <div className={styles.filterCategory} key={value}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={value}
                                            checked={college.includes(value)}
                                            onChange={handleCollegeChange}
                                        />
                                        {value}
                                    </label>
                                </div>
                            ))}
                        </div>


                        <p onClick={() => setShowBranches(!showBranches)}>Branches</p>
                        <div className={`${styles.filterlist} ${showBranches ? styles.showfilterlist : ''}`}>
                            {["CSE", "AIML", "AIDS", "IOT", "ME", "EC", "EE"].map((value) => (
                                <div className={styles.filterCategory} key={value}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={value}
                                            checked={degree.includes(value)}
                                            onChange={handleDegreeChange}
                                        />
                                        {value}
                                    </label>
                                </div>
                            ))}
                        </div>


                        <p onClick={() => setShowYears(!showYears)}>Year</p>
                        <div className={`${styles.filterlist} ${showYears ? styles.showfilterlist : ''}`}>
                            {graduationYears.map((value) => (
                                <div className={styles.filterCategory} key={value}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={value}
                                            checked={GraduationYear.includes(value)}
                                            onChange={handleYearChange}
                                        />
                                        {value}
                                    </label>
                                </div>
                            ))}
                        </div>


                        <p onClick={() => setShowSkills(!showSkills)}>Skills</p>
                        <div className={`${styles.filterlist} ${showSkills ? styles.showfilterlist : ''}`}>
                            {skillOptions.map((value) => (
                                <div className={styles.filterCategory} key={value.value}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={value.value}
                                            checked={Skills.includes(value.value)}
                                            onChange={handleSkillChange}
                                        />
                                        {value.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className={styles.searchContainer}>
                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Search team members..."
                                value={searchname}
                                onChange={(e) => setSearchname(e.target.value)}
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
                                        <button onClick={()=>handleInvite(item)}>Invite</button>
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
                <button className={styles.backButton}
                onClick={handleNavigateBack}
                >
                    Back
                </button>
                <button className={styles.completeRegistrationButton}>Complete Registration</button>
            </div>
        </>
    );
};

export default AddMember;
