import { Route, Routes } from "react-router-dom";
import Login from "./Views/Authentication_and_authorization/login";
import Signup from "./Views/Authentication_and_authorization/signup";
//import Nav from "./Components/Nav";
import AccountManagementPage from "./Views/Authentication_and_authorization/account_management_page";
import ForgetPassword from "./Views/Authentication_and_authorization/forget_password";
import "../src/index.css"
import SigninBackground from "./Components/SigninBackground";
import UserDashboard from "./Views/Users/UserDashboard";
import Home from "./Home";
import VerifyEmail from "./Views/Authentication_and_authorization/VerifyEmail";
import AgentDashboard from "./Views/Agents_and_brokers/AgentDashboard";

function App() {
  return (
    <div className="main-body">
    <Routes >
      <Route path="/" element={<Home/>}/>
      <Route path="/authentication">
        <Route path="/authentication/signup" element={<><Signup/><SigninBackground/></>} />
        <Route path="/authentication/login" element={<><Login/><SigninBackground/></>} />
        <Route path="/authentication/verify_email" element={<><VerifyEmail/><SigninBackground/></>} />
        <Route path="/authentication/forget_password" element={<><ForgetPassword/><SigninBackground/></>}/>
        <Route path="/authentication/account_management_page" element={<AccountManagementPage/>}/>
      </Route>
      <Route path="/user-dashboard">
        <Route path="/user-dashboard/" element={<UserDashboard/>}/>
      </Route>
      <Route path="/agent-dashboard">
        <Route path="/agent-dashboard/" element={<AgentDashboard/>}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
