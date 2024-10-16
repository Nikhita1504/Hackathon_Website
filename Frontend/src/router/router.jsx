import { createBrowserRouter, Form } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import Home from "../Pages/home";
import Profile from "../Pages/profile";
import { ToastContainer } from "react-toastify";
import { Protected, Admin } from "../AuthComponent/Protected";
import App from "../App";
import Setpassword from "../Pages/setpassword";
import HomePage from "../components/homepage/HomePage";
import Teams from "../components/teams/Teams";
import Hackathon from "../components/hackathons/Hackathon";
import Messages from "../components/messages/Messages";
import EditProfile from "../components/navbar/edit-profile/EditProfile";

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
        element: <Home/>,
        children:[
          {
            path:"",
            element:<HomePage/>
          },
          {
            path:"teams",
            element:<Teams/>
          },
          {
            path:"hackathons",
            element:<Hackathon/>
          },
          {
            path:"messages",
            element:<Messages/>
          },
          {
            path:"edit-profile",
            element:<EditProfile/>
        },
        ]
      },
      {
        path: "profile",
        element: (
          <Protected>
            <Profile></Profile>
            </Protected>
        
        ),
      },
      {

      path: "setpassword",
      element: (
       
          <Setpassword/>
      
      ),
    },
  

    ],
  },
]);

export default router;
