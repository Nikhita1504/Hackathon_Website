import React from "react";
import ProfileSection from "./../HomePage/Profile-section/ProfileSection";
import Post from "./../HomePage/Post/Post";
import Notifications from "./../HomePage/Notifications/Notifications";
import "./HomePage.scss";
import ViewNotification from "./Notifications/View_Notification/ViewNotification";
import { useState } from "react";

const HomePage = () => {
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
const [Details , SetDetails] = useState({})

  return (
    <>
      {isFloatingVisible && (
        <ViewNotification
          setIsFloatingVisible={setIsFloatingVisible}
    Details = {Details} 
        ></ViewNotification>
      )}
      <div className="home-container">
        <div className="one">
          <ProfileSection />
        </div>

        <div className="two">
          <Post />
        </div>

        <div className="three">
          <Notifications setIsFloatingVisible={setIsFloatingVisible} SetDetails={SetDetails} />
        </div>
        
      </div>
    </>
  );
};

export default HomePage;
