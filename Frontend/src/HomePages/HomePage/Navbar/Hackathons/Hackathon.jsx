import React, { useContext, useEffect } from 'react';
import styles from './hackathon.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import HackathonContext from '../../../../Context/HackathonContext';
import axios from 'axios';

const Hackathon = () => {
  const { hackathonDetails, setHackathonDetails } = useContext(HackathonContext);
  const navigate = useNavigate();

  const handleNavigate = (hackathonName, e) => {
    e.preventDefault(); 
    // console.log(hackathonName)
    navigate(`/home/hackathons/${hackathonName}`);
  };

  // console.log(hackathonDetails)



  useEffect(() => {
    const fetchHackathonData = async () => {
      const response = await axios.get("http://localhost:3000/hackathon/upcominghackathon");
      setHackathonDetails(response.data);
    };
    fetchHackathonData();
  }, [setHackathonDetails]);


  return (
    <>
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.h3}>Upcoming Hackathons</h3>
      </div>
      <div className={styles.gridContainer}>
        {hackathonDetails.length > 0 ? (
          hackathonDetails.map((v, index) => (
            <div key={index} className={styles.card} onClick={(e) => handleNavigate(v.name, e)}>
              <img src="/assets/logo1.jpg" className={styles.logo} alt={`${v.name} logo`} />
              <h4>{v.name}</h4>
            </div>
          ))
        ) : (
          <p>No hackathons Available</p>
        )}
      </div>
    </div>
  
    </>
  );
};

export default Hackathon;
