import React, { useEffect, useRef, useState } from 'react';
import "./ProfileSection.scss";
import { jwtDecode } from 'jwt-decode';  // jwtDecode should not be in curly braces
import axios from 'axios';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
    const [modal, setopenmodal] = useState(false);
    const navigate = useNavigate()
    const [load, setload] = useState(true);  // start with loading set to true
    const [userdata, setuserdata] = useState({});
    const imageref = useRef(null);
    const [profilepic, setprofilepic] = useState("")
    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        let token = queryParams.get('token');
        if (token) {

            sessionStorage.setItem('token', token);
        } else {
            token = sessionStorage.getItem('token', token)
        }
        

        const payload = jwtDecode(token)
        // console.log("paylogad",payload)

        const fetchuserdata = async () => {
           
            try {
               
                const response = await axios.get(`http://localhost:3000/home/userdata/${payload.user.email}`)

                // setprofilepic(response.data.userdata.profilePicture)
                setuserdata(response.data.userdata);
                setload(false);


            } catch (error) {

                setload(false);
            }
        }
        fetchuserdata();

    }, [userdata])

    const handleEdit = () => {
        navigate('/home/edit-profile');
    }


    if (load) {
        return <p>Loading</p>
    }

    const handleclick = () => {
        imageref.current.click();
    }
     
    const handleProfileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error("No file selected!");
            return;
        }
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif","image/webp"];
        if (!allowedTypes.includes(file.type)) {
            alert("Only image files are allowed!");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    

        const queryParams = new URLSearchParams(window.location.search);
        let token = queryParams.get("token") || sessionStorage.getItem("token");
        if (!token) {
            console.error("Token not found!");
            return;
        }
    
        const payload = jwtDecode(token);
    
        try {

            const uploadResponse = await axios.post(
                `http://localhost:3000/upload/${payload.user.email}`,
                formData
            );
    

            setuserdata(uploadResponse);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };
    
    


    return (
        <div className="container">
            <div className='profile-container'>
                <FontAwesomeIcon className='edit-icon' onClick={handleEdit} icon={faPenToSquare} />

                <div className="profile-img" onClick={handleclick}>
                    {
                        userdata.profilePicture ? (
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
                        )
                    }
                    <input type="file" ref={imageref} onChange={handleProfileChange} style={{ display: "none" }} />
                </div>
                <p className="name">{userdata.name || "Provide username"}</p>

                <div className="student-info">
                    <div className="info">
                        <p>{userdata.college || "not mentioned"}</p>
                        <p>{userdata.GraduationYear || "not mentioned"}</p>
                        <p>{userdata.degree || "not mentioned"}</p>
                    </div>

                    <div className="bio">
                        <p>Bio</p>
                        {userdata.bio || "not mentioned"}
                    </div>

                    <div className="skills">
                        <p>Skills</p>
                        <div className="skills-list">
                            {userdata.skills && userdata.skills.length > 0 ? (
                                userdata.skills.map((skill, index) => (
                                    <div key={index} className="skill-item">{skill}</div>
                                ))
                            ) : (
                                <div className="no-skills">No skills mentioned</div>
                            )}
                        </div>
                    </div>

                    <div className="github-url">
                        <p>Github</p>
                        <a className='light' href={userdata.githubProfile}>{userdata.githubProfile || "not mentioned"}</a>
                    </div>

                    <div className="linkedin-url">
                        <p>Linkedin</p>
                        <a className='light' href={userdata.linkedinProfile}>{userdata.linkedinProfile || "not mentioned"}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
