import { createBrowserRouter } from "react-router-dom";
import Login from "../login/login";
import App from "../App";

const router = createBrowserRouter([
  {
   path:"/",
   element:<App/>,
   children:[
    {
    path:"/login",
    element:<Login></Login>
   }
   
   ]

  }
]);

export default router;