import "./App.css"
import { Outlet } from "react-router-dom";
import UserProvider from "./Context/UsercontextProvider";
import HackathonContextProvider from "./Context/HackathoncontextProvider";
function App() {

  return <>
    <UserProvider>
      <HackathonContextProvider>
        <Outlet />
      </HackathonContextProvider>

    </UserProvider>
  </>


}

export default App;