import React from 'react'
import ProfileSection from './profile-section/ProfileSection'
import Post from './posts/Post'
import Notifications from './notifications/Notifications'
import "./home.scss"

const HomePage = () => {
  return (
    <div className='home-container'>
     {/* profile-section */}
    <div className="one">
    <ProfileSection/>
    </div>

       {/* posts-section */}
    <div className="two">
    <Post/>
    </div>

       {/* notifications */}
   <div className="three">
   <Notifications/>
   </div>
   
   
    </div>
  )
}

export default HomePage
