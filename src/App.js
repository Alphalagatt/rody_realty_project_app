import { Route, Routes } from "react-router-dom";
import Login from "./Views/Authentication_and_authorization/login";
import Signup from "./Views/Authentication_and_authorization/signup";
import Nav from "./Components/Nav";
import AccountManagementPage from "./Views/Authentication_and_authorization/account_management_page";
import ForgetPassword from "./Views/Authentication_and_authorization/forget_password";
import "../src/index.css"

function App() {
  return (
    <div className="main-body">
    <Nav/>
    <Routes >
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forget_password" element={<ForgetPassword/>}/>
      <Route path="/account_management_page" element={<AccountManagementPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
