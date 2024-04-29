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

    if(isLoggedIn){
    return <div>
    <button onClick={logout}>Log Out</button>
    <p>logged in</p>
    </div>;

   }else{
    return <Navigate to="/" replace={true} />;
   }
}

export default UserDashboard;