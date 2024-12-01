import React, { useContext, useEffect, useState } from "react";
import styles from "./AddMember.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import HackathonContext from "../../../../../../Context/HackathonContext";
import SocketContext from "../../../../../../Context/SocketContext";
import Usercontext from "../../../../../../Context/Usercontext";
import skillOptions from "../../../../../../utils/Skillsoption";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddMember = () => {


    const { socket } = useContext(SocketContext)
    const { Userinfo } = useContext(Usercontext);

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
    const [leaveModal, setLeaveModal] = useState(false);
    const [removeModal, setremoveModal] = useState(false);



    const [modal, setmodal] = useState(false);

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
                const response = await axios.get(
                    `http://localhost:3000/hackathon/${hackathonName}`
                );
                setHackathonDetails(response.data);
            } catch (error) {
                console.error("Error fetching hackathon data:", error);
            }
        };
        fetchData();
    }, [hackathonName, setHackathonDetails]);

    const fetchTeamData = async () => {
        try {
            const currentuserId=Userinfo._id
            const response = await axios.get(`http://localhost:3000/team/team-details/${teamData._id}`,{
                params: { userId: currentuserId } 
            });

            const members = response.data.members;

            setTeamMembers(members);

        } catch (error) {
            console.log('Error fetching team data:', error);

            // if ( error.response.status === 403) {

            //     navigate('/home/hackathons');
            // } else {

                navigate('/home/hackathons');
            // }

        }
    };




    useEffect(() => {
        fetchTeamData();
        const intervalId = setInterval(fetchTeamData, 5000);

        return () => clearInterval(intervalId);
    }, [hackathonName, teamData._id]);



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
            const response = await axios.get(
                "http://localhost:3000/add-member/search",
                {
                    params: {
                        name: searchname.length > 2 ? searchname : undefined,
                        college: college.length ? college : undefined,
                        degree: degree.length ? degree : undefined,
                        GraduationYear: GraduationYear.length ? GraduationYear : undefined,
                        skills: Skills.length ? Skills : undefined,
                    },
                }
            );
            setRecommendations(response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    useEffect(() => {
        if (
            searchname.length > 2 ||
            college.length ||
            degree.length ||
            GraduationYear.length ||
            Skills.length
        ) {
            fetchRecommendations();
        } else {
            setRecommendations([]);
        }
    }, [searchname, college, degree, GraduationYear, Skills]);

    const handleInvite = (item) => {
        if (teamMembers.length == hackathonDetails?.teamSize?.max) {
            toast.info("Team is full");
        } else {
            socket.emit(
                "SendNotification",
                Userinfo.email,
                item.email,
                `${Userinfo.name} invites you to join their team for the ${hackathonName} hackathon!`,
                { teamId: teamData._id }
            );
        }
    };

    const navigate = useNavigate();
    const handleNavigateBack = () => {
        navigate(`/home/hackathons/${hackathonName}/team-details`);
    };
    const handleProfileNavigate = (userEmail) => {
        navigate("/home/view-profile", { state: { userEmail } });
    };

    const handleDeleteTeam = async (teamId) => {
        try {

            await axios.delete(`http://localhost:3000/team/delete/${teamId}`);
            setmodal(false);
            navigate(`/home/hackathons`);
            toast.success("Team deleted successfully!");
        } catch (error) {
            console.error("Failed to delete the team:", error);
            toast.error("Failed to delete the team. Please try again.");
        }
    };



    const handleLeave = async (userid, teamid) => {
        try {
            await axios.delete(`http://localhost:3000/team/leave/${teamid}/${userid}`)
            setLeaveModal(false);
            navigate("/home/hackathons")
        } catch (error) {
            console.log(error);
        }
    }
    const [memberToRemoveId, setMemberToRemoveId] = useState(null);
    const handleRemoveModal = (memberId) => {
        setMemberToRemoveId(memberId);
        setremoveModal(true);

    }
    const handleRemove = async (userid, teamid) => {
        console.log("Current User ID:", Userinfo._id);
        console.log("Removing User ID:", userid);
        
        try {
            await axios.delete(`http://localhost:3000/team/leave/${teamid}/${userid}`);
            
   
            setremoveModal(false);
        } catch (error) {
            console.log(error);
        }
    }
   
// console.log(teamData.members)

    const normalizedTeamMembers = teamMembers.map((value) => ({
        ...value,
        role: value.role.toLowerCase().trim(), // Convert role to lowercase and remove extra spaces
    }));

    const arr = normalizedTeamMembers
        .filter((value) => value.role === 'member')

    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    {Userinfo._id}
                    <h2 className={styles.hackathonTitle}>{hackathonDetails.name}</h2>
                    <p className={styles.institution}>
                        {hackathonDetails?.organizers?.[0]?.name || "N/A"}
                    </p>

                    <div className={styles.teamSection}>
                        <div className={styles.teamHeader}>
                            <h3 className={styles.teamName}>
                                Team Name: <span className={styles.teamNameHighlight}>{teamData.teamName} </span>
                            </h3>
                            <p className={styles.memberCount}>Teammates: {teamMembers.length}/{hackathonDetails?.teamSize?.max || 'N/A'}</p>
                        </div>
                        <p className={styles.memberCountP}>You can add up to 3 additional members</p>
                        <div className={styles.membersContainer}>
                            {teamMembers.length > 0 ? (
                                teamMembers.map((value) => (
                                    <div className={styles.memberCard} key={value._id}>
                                        <div className={styles.memberAvatar}>
                                            {
                                                value.user.profilePicture ? (<img src={value.user.profilePicture} />) :
                                                    (<img src="/assets/uploadpic .png" alt="Member Avatar" />)
                                            }
                                        </div>
                                        <div>
                                            <div className={styles.memberInfo}>
                                                <p className={styles.memberName} onClick={() => { handleProfileNavigate(value.user.email) }}>{value.user.name || "Unknown"}</p>
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

                                            <div className={styles.memberBtnCon}>
                                                <button className={styles.memberRole}>
                                                    {value.role ? value.role.charAt(0).toUpperCase() + value.role.slice(1) : ""}
                                                </button>

                                                {
                                                    value.role === 'member' && (
                                                        <button
                                                            key={value._id}
                                                            className={styles.removeBtn}
                                                            onClick={() => handleRemoveModal(value.user._id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    )
                                                }

                                            </div>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No team members found</p>
                            )}
                        </div>

                        {/* <button className={styles.leaveBtn} onClick={() => setLeaveModal(!leaveModal)} >Leave</button> */}



                        {teamData?.members?.some(
                            (member) =>
                                member.role === "member" &&
                                member.user.toString() === Userinfo._id.toString()
                        ) && (
                                <button className={styles.leaveBtn} onClick={() => setLeaveModal(!leaveModal)} >Leave</button>

                            )}

                        {teamData?.members?.some(
                            (member) =>
                                member.role === "leader" &&
                                member.user.toString() === Userinfo._id.toString()
                        ) && (
                                <button
                                    onClick={() => setmodal(!modal)}
                                    className={styles.deleteTeamBtn}
                                >
                                    Delete Team
                                </button>
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
                        <div
                            className={`${styles.filterlist} ${showColleges ? styles.showfilterlist : ""
                                }`}
                        >
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
                        <div
                            className={`${styles.filterlist} ${showBranches ? styles.showfilterlist : ""
                                }`}
                        >
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
                        <div
                            className={`${styles.filterlist} ${showYears ? styles.showfilterlist : ""
                                }`}
                        >
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
                        <div
                            className={`${styles.filterlist} ${showSkills ? styles.showfilterlist : ""
                                }`}
                        >
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
                                            <div >
                                                {
                                                    item.profilePicture ? (<img className={styles.itemimg} src={item.profilePicture} alt="" />) : <img className={styles.itemimg} src="/assets/uploadpic .png" alt="" />
                                                }
                                            </div>
                                            <div className={styles.details}>
                                                <span className={styles.detailsName} onClick={() => { handleProfileNavigate(item.email) }}>{item.name}</span>
                                                <div className={styles.down}>
                                                    <span>{item.college}</span>
                                                    <span className={styles.itemborder}>{item.degree}</span>
                                                    <span className={styles.itemborder}>{item.GraduationYear}</span>

                                                </div>

                                            </div>
                                        </div>
                                        <button onClick={() => handleInvite(item)}>Invite</button>
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

            {/* Modal */}
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

            {/* Leave Modal */}
            {leaveModal && (
                <div className={styles.modalBg}>
                    <div className={styles.modal}>
                        <h3>Are you sure you want to leave this team?</h3>
                        <div className={styles.modalButtons}>
                            <button
                                onClick={() => handleLeave(Userinfo._id, teamData._id)}
                                className={styles.confirmButton}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setLeaveModal(false)}
                                className={styles.cancelButton}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {removeModal && (
                <div className={styles.modalBg}>
                    <div className={styles.modal}>
                        <h3>Are you sure you want to remove this member?</h3>
                        <div className={styles.modalButtons}>
                            <button
                                onClick={() => handleRemove(memberToRemoveId, teamData._id)}
                                className={styles.confirmButton}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setremoveModal(false)}
                                className={styles.cancelButton}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default AddMember;
