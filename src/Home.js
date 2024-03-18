import { useAuth } from "./MiddlewareApis/AuthContext";
import { Navigate } from "react-router-dom";
import Nav from "./Components/Nav";

function Home(){
    const AuthenticateContext = useAuth();
    if(AuthenticateContext.isLoggedIn || window.localStorage.getItem("isLoggedIn")){
        return <Navigate to="/user-dashboard/"/>
    }
    return <div>
        <Nav/>
        This is your home page.
    </div>
}

export default Home;