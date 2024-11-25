import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ViewProfile.module.css";

function ViewProfile() {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const [userdata, setuserdata] = useState({});

  useEffect(() => {
    const fetchuserdata = async () => {
      const response = await axios.get(
        `http://localhost:3000/home/userdata/${userEmail}`
      );
      setuserdata(response.data.userdata);
    };
    fetchuserdata();
  }, [userEmail]); 

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileImg}>
          {userdata.profilePicture ? (
            <img
              src={userdata.profilePicture}
              alt="Profile"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              src="/assets/uploadpic .png"
              alt="Upload"
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <p className={styles.name}>{userdata.name || "Provide username"}</p>
        <div className={styles.studentInfo}>
          <div className={styles.info}>
            <p>{userdata.college || "not mentioned"}</p>
            <p>{userdata.GraduationYear || "not mentioned"}</p>
            <p>{userdata.degree || "not mentioned"}</p>
          </div>
          <div className={styles.bio}>
            <p>Bio</p>
            {userdata.bio || "not mentioned"}
          </div>
          <div className={styles.skills}>
            <p>Skills</p>
            <div className={styles.skillsList}>
              {userdata.skills && userdata.skills.length > 0 ? (
                userdata.skills.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    {skill}
                  </div>
                ))
              ) : (
                <div className={styles.noSkills}>No skills mentioned</div>
              )}
            </div>
          </div>
          <div className={styles.githubUrl}>
            <p>Github</p>
            <a
              className={styles.light}
              href={userdata.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userdata.githubProfile || "not mentioned"}
            </a>
          </div>
          <div className={styles.linkedinUrl}>
            <p>LinkedIn</p>
            <a
              className={styles.light}
              href={userdata.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userdata.linkedinProfile || "not mentioned"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
