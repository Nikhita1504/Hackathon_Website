import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import App from "../App";
import Login from "./../AuthPages/LoginPage/login"
import Signup from "./../AuthPages/SignupPage/signup"
import Home from "./../HomePages/home"
import HomePage from "./../HomePages/HomePage/HomePage"
import Teams from "./../HomePages/HomePage/Navbar/Teams/Teams"
import Hackathon from "./../HomePages/HomePage/Navbar/Hackathons/Hackathon"
import Messages from "./../HomePages/HomePage/Navbar/Message/Messages"
import EditProfile from "./../HomePages/HomePage/Profile-section/EditProfile/EditProfile"
import { Protected } from "./../AuthPages/AuthComponent/Protected"
import CreateProfile from "./../AuthPages/SignupPage/CreateProfile/CreateProfile";
import Setpassword from "./../AuthPages/SignupPage/SetPassword/setpassword"
import HackathonDetails from "../HomePages/HomePage/Navbar/Hackathons/hackathon_details/HackathonDetails";
import TeamDetails from "../HomePages/HomePage/Navbar/Hackathons/team-details/TeamDetails";
import AddMember from "../HomePages/HomePage/Navbar/Hackathons/team-details/addmember/AddMember";
import ViewProfile from "../HomePages/HomePage/Notifications/view_profile/ViewProfile";
import ViewDetails from "../HomePages/HomePage/Navbar/Teams/view-details/ViewDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "",
            element: <HomePage />
          },
          {
            path: "teams",
            element: <Teams />
          },
          {
            path:"teams/view-details",
            element:<ViewDetails/>

          },
          {
            path: "hackathons",
            element: <Hackathon />,

          },
          {
            path: "messages",
            element: <Messages />
          },
          {
            path: "edit-profile",
            element: <EditProfile />
          },
          {
            path: "hackathons/:hackathonName",
            element: <HackathonDetails />
          },
          {
            path: "hackathons/:hackathonName/team-details",
            element: <TeamDetails />,

          },
          {
            path: "hackathons/:hackathonName/team-details/add-member",  // Define AddMember as a sibling route
            element: <AddMember />
          },
          {
            path:"view-profile",
            element:<ViewProfile/>
          }
        ]
      },
      {
        path: "profile",
        element: (
          <Protected>
            <CreateProfile></CreateProfile>
          </Protected>

        ),
      },
      {

        path: "setpassword",
        element: (

          <Setpassword />

        ),

      },



    ],
  },
]);

export default router;
