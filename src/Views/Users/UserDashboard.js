import { useAuth } from "../../MiddlewareApis/AuthContext";
import { Navigate } from "react-router";


function UserDashboard(){
    const {user, setUser,isLoggedIn,SetIsLoggedIn} = useAuth();

    function logout(){
        window.localStorage.clear();
        setUser({});
        SetIsLoggedIn(false);
        return <Navigate to="/" replace={true} />
    }

    if(window.localStorage.getItem("isLoggedIn")==null){
        return <Navigate to="/" replace={true} />
    }

   if(isLoggedIn || window.localStorage.getItem("isLoggedIn")){
    if(!JSON.parse(window.localStorage.getItem("AuthUser")).user.emailVerified){
        return <Navigate to="/authentication/verify_email" replace={true} />
    }
    return <div>
    <button onClick={logout}>Log Out</button>
    <p>{JSON.stringify(JSON.parse(window.localStorage.getItem("AuthUser")).user.emailVerified)}</p>
    </div>;

   }else{
    return <Navigate to="/" replace={true} />;
   }
}

export default UserDashboard;