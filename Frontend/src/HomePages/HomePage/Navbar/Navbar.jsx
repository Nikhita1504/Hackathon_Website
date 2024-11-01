import React, { useEffect, useState } from 'react';
import "./navbar.scss";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Navbar = () => {
  const [modal, setopenmodal] = useState(false);
  const navigate = useNavigate();
  const handleEditProfile = () => {
    setopenmodal(false)
    navigate('/home/edit-profile');
  };

 

  return (
    <>
      <div className='nav-container'>
        <div>
       <h3>Logo</h3>
        </div>
        <div className="navbar">
          <ul>
            <Link to="/home">Home</Link>
            <Link to="/home/teams">Teams</Link>
            <Link to="/home/hackathons">Hackathons</Link>
            <Link to="/home/messages">Messages</Link>
          </ul>
          <div className="search-bar">
            <form action="">
              <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
              <input type="text" placeholder='Search' />
            </form>
          </div>
        </div>

        <div className='profile-dropdown'>
          <div className="circle"></div>
          <div className="Me">
            Me <FontAwesomeIcon
              onClick={() => setopenmodal(!modal)}
              className='triangle-down' icon={faCaretDown} />
            <div className={`modaloverlay ${modal ? 'modalshow' : ''}`}>
              <button onClick={handleEditProfile}>Edit profile</button>
              <br />
              <button>Logout</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
