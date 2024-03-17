import { Navigate } from "react-router";
import { sendEmailVerification } from "firebase/auth";
import auth from "../../MiddlewareApis/Firebase";
import { useAuth } from "../../MiddlewareApis/AuthContext";

function VerifyEmail(){

    const {user, setUser,isLoggedIn,SetIsLoggedIn} = useAuth();


    function logout(){
        window.localStorage.clear();
        setUser({});
        SetIsLoggedIn(false);
        return <Navigate to="/" replace={true}/>
    }

    function verify(){
        sendEmailVerification(auth.currentUser).then((value)=>{
            console.log("value: "+value);
            localStorage.clear();
            setUser({});
            SetIsLoggedIn(false);

            return <Navigate to="/authentication/login" replace={true}/>
        }).catch((err)=>{
            console.log("error: "+err.message);
        });
    }



    //const AuthenticateContext = useAuth();
    if(window.localStorage.getItem("isLoggedIn")){
        if(JSON.parse(window.localStorage.getItem("AuthUser")).user.emailVerified){
            return <Navigate to="/user-dashboard/" replace={true} />
        }else{
            return <div className="signin-form">
                <div className="signin-form-title"><h1>Verify Email</h1></div>
                <div>
                    <p>You are seeing this page because the email used to login has not been verified by our system.</p>
                    <p>By clicking the link below, an email containing a verification link will be sent to your email. Click on the link sent to your email to verify this email address before trying to login again.</p>
                    <p>Should you choose not to verify this email, please click on the logout button to be redirected to the home page where you can continue browsing this site without credentials. </p>
                </div>
                <div>
                <input className="signin-form-submit" type="button" value={'Verify Email'} onClick={verify}/>
                </div>
                <div>
                <input className="signin-form-submit" type="button" value={'Sign Out'} onClick={logout}/>
                </div>
            </div>
        }
    }else{
        return <Navigate to="/authentication/login"/>
    }
    
}

export default VerifyEmail;