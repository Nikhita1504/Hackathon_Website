import React from 'react'
import ProfileSection from './../HomePage/Profile-section/ProfileSection'
import Post from './../HomePage/Post/Post'
import Notifications from './../HomePage/Notifications/Notifications'
import "./HomePage.scss"

const HomePage = () => {
 

  return (
    <div className='home-container'>
    <div className="one">
    <ProfileSection/>
    </div>

     
    <div className="two">
    <Post/>
    </div>

   <div className="three">
   <Notifications/>
   </div>
   
   
    </div>
  )
}

export default HomePage
