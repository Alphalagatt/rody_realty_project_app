import { useAuth } from "./MiddlewareApis/AuthContext";
import { Navigate } from "react-router-dom";

function Home(){
    const AuthenticateContext = useAuth();
    if(AuthenticateContext.isLoggedIn || window.localStorage.getItem("isLoggedIn")){
        return <Navigate to="/user-dashboard/"/>
    }
    return <div>
        This is your home page.
    </div>
}

export default Home;