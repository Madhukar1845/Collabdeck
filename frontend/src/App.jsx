import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Room from "./pages/Room";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App(){
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Welcome/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>} ></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/room/:roomId" element={<Room/>}></Route>
  </Routes>
  </BrowserRouter>
  )
}
export default App;
