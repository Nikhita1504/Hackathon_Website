import React, { useEffect, useState } from 'react'
import styles from './hackathon.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Hackathon = () => {
  const [hackathon, setHackathon] = useState([])
  const navigate = useNavigate();
  const handleNavigate = (hackathonName,e) => {
    navigate(`/home/${hackathonName}`)
    e.preventDefault();

  }
  useEffect(() => {
    const fetchHackathonData = async () => {
      const response = await axios.get("http://localhost:3000/hackathon/upcominghackathon")
      setHackathon(response.data);
    }
    fetchHackathonData()
  }, [])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.h3}>Upcoming Hackathons</h3>
        </div>
        <div className={styles.gridContainer}>
          {hackathon.length > 0 ?
            hackathon.map((v) => {
              return (
                <>
                  <div className={styles.card} onClick={(e)=> handleNavigate(v.name,e)}>
                    <img src={"/assets/logo1.jpg"} className={styles.logo} />

                    <h4>{v.name}</h4>
                  </div>
                </>
              )
            })
            : ("No hackathons Available")}
        </div>
      </div>

    </>
  )
}

export default Hackathon;

