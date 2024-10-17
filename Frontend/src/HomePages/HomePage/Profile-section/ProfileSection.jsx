import React, { useContext, useEffect, useState } from 'react'
import "./ProfileSection.scss"
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'
import Usercontext from '../../../Context/Usercontext';
// import skillOptions from '../../../data/skills';
// import profileimg from "./user.png"

const ProfileSection = () => {

    const [modal, setopenmodal] = useState(false);
    const[load,setload]=useState(false)
    const [userdata, setuserdata] = useState({});
    useEffect( () => {
   
        const queryParams = new URLSearchParams(window.location.search);
   console.log(window.location.search); 
   let token = queryParams.get('token');
   if(token){
    console.log(token);
    sessionStorage.setItem('token' , token);
   }else{
    token = sessionStorage.getItem('token' , token)
   }
  
      const user= jwtDecode(token)
        const fetchuserdata = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/home/userdata/${user.email}`)

                setuserdata(response.data);
                setload(false);

               
            } catch (error) {
                console.log(error)
                setload(false);
            }
        }
        fetchuserdata();

    }, [])
  

    if (load) {
        return <p>Loading</p>
    }


    return (
        <>
            <div className="container">
                <div className='profile-container'>
                    <div className="profile-img">
                        <img src="/user.png" alt="" />
                    </div>
                    <p className="name">{userdata.name || "Provide username"}</p>



                    <div className="student-info">


                        <div className="info">
                            <p>{userdata.college||"not mentioned"}</p>
 
                            <p>{userdata.GraduationYear || "not mentioned"}</p>
                            <p>{userdata.degree || "not mentioned"}</p>

                        </div>

                        <div className="bio">
                            <p>Bio</p>
                            {userdata.bio || "not mentioned"}
                            

                        </div>


                        <div className="skills">

                            <p>Skills</p>
                            {/* <button className='add-btn'
                                onClick={() => setopenmodal(true)}
                            >add</button>
                           
                            <div className={`modaloverlay ${modal ? 'modalshow' : ''}`}>
                                <button className='cross-btn'
                                    onClick={() => setopenmodal(false)}
                                >
                                    {
                                        modal ? <span>&times;</span> : ''
                                    }</button>

                                <select name="newSkill" id="">
                                    {skillOptions.map(skill,i)

                                    }
                                    
                                    </select>    
                                
                            </div> */}


                            <div className="skills-list">
  {userdata.skills && userdata.skills.length > 0 ? (
    userdata.skills.map((skill, index) => (
      <div key={index} className="skill-item">{skill }</div>
    ))
  ) : (
    <div className="no-skills">No skills mentioned</div>
  )}
</div>

                        </div>
                        <div className="github-url">
                            <p>Github</p>

                            <a className='light' href={userdata.githubProfile}>{userdata.githubProfile|| "not mentioned"}</a>


                        </div>
                        <div className="linkedin-url">
                            <p>Linkedin</p>
                            <a className='light' href={userdata.linkedinProfile}>{userdata.linkedinProfile|| "not mentioned"}</a>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSection

