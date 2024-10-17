import"./App.css"
import { Outlet } from "react-router-dom";
import UserProvider from "./Context/UsercontextProvider";
function App() {

  return <>
  <UserProvider>
 <Outlet/>
  </UserProvider>
  </>
    
  
}

export default App;