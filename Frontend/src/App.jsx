import "./App.css"
import { Outlet } from "react-router-dom";
import UserProvider from "./Context/UsercontextProvider";
import HackathonContextProvider from "./Context/HackathoncontextProvider";
import SocketProvider from "./Context/socketcontextProvider";
function App() {

  return <>
    <UserProvider>
      <HackathonContextProvider>
        <SocketProvider>
        <Outlet />
        </SocketProvider>
      </HackathonContextProvider>

    </UserProvider>
  </>


}

export default App;