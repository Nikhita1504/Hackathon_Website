import React, { useContext, useEffect, useState } from "react";
import styles from "./AddMember.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import HackathonContext from "../../../../../../Context/HackathonContext";
import SocketContext from "../../../../../../Context/SocketContext";
import Usercontext from "../../../../../../Context/Usercontext";

const AddMember = () => {

  const {socket} = useContext(SocketContext)
  const{Userinfo} = useContext(Usercontext);
  const [recommendations, setRecommendations] = useState([]);
  const location = useLocation();
  const hackathonName = location.state?.hackathonName;
  const { hackathonDetails, setHackathonDetails } =
    useContext(HackathonContext);
  const [searchname, setSearchname] = useState("");

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

  const handleYearChange = (e) => {
    const { value, checked } = e.target;
    setGraduationYear((prev) =>
      checked ? [...prev, value] : prev.filter((year) => year !== value)
    );
  };

  const handleReset = () => {
    setCollege([]);
    setDegree([]);
    setGraduationYear([]);
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
      GraduationYear.length
    ) {
      fetchRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [searchname, college, degree, GraduationYear]);

  const handleInvite = (item) => { 
    console.log(item.email);
    socket.emit("SendNotification" ,Userinfo.email , item.email,`${Userinfo.name} invites you to join their team for the ${hackathonName} hackathon!`
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
            Indian Institute of Technology (IIT), Gandhinagar
          </p>

          <div className={styles.teamSection}>
            <div className={styles.teamHeader}>
              <h3 className={styles.teamName}>
                Team Name:{" "}
                <span className={styles.teamNameHighlight}>Tech Savvies</span>
              </h3>
              <p className={styles.memberCount}>Teammates: 1/4</p>
            </div>
            <p className={styles.memberInfo}>
              You can add up to 3 additional members
            </p>
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
            <p>Branches</p>
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
            <p>Year</p>
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
                      <span className={styles.itemborder}>
                        {item.GraduationYear}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        handleInvite(item);
                      }}
                    >
                      Invite
                    </button>
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
        <button className={styles.backButton} onClick={handleNavigateBack}>
          Back
        </button>
        <button className={styles.completeRegistrationButton}>
          Complete Registration
        </button>
      </div>
    </>
  );
};

export default AddMember;
