import {createUserWithEmailAndPassword} from "firebase/auth";
import auth from "../../MiddlewareApis/Firebase";
import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../MiddlewareApis/AuthContext";
import Loader from "../../Components/Loader";
function Signup() {
    let email_ref = useRef("");
    let password_ref = useRef("");
    let confirm_pass_ref = useRef("");
    const[authentication,setAuthentication] = useState({
        email_error:"",
        pass_len:"",
        pass_cap:"",
        pass_num:"",
        pass_small:"",
        pass_special:"",
        confirm_pass_error:"",
        authentication_error:"",
        isLoading:false
    });
    const email_validation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const {user, setUser,isLoggedIn, SetIsLoggedIn} = useAuth();


    function checkEmail(){
        if(!email_ref.current.value.match(email_validation)){
            setAuthentication((prev)=>{
                return {...prev,
                email_error:"Invalid email!!"
                }
            });
        }else{
            setAuthentication((prev)=>{
                return {...prev,
                email_error:""
                }
            });
        }
    };

    function checkPass(){
        if(password_ref.current.value.length<8){
            //have atleast 8 characters.
            setAuthentication((prev)=>{
                return {...prev,
                pass_len:"Password length should be greater than 8!"
                }
            });
        }else{
            setAuthentication((prev)=>{
                return {...prev,
                pass_len:""
                }
            });
        }

        if(!password_ref.current.value.match("[A-Z]")){
            //have atleast 1 capital later
            setAuthentication((prev)=>{
                return {...prev,
                pass_cap:"Password should contain atleast 1 capital letter"
                }
            });
        }else{
            setAuthentication((prev)=>{
                return {...prev,
                pass_cap:""
                }
            });
        }
        if(!password_ref.current.value.match("[a-z]")){
            //Have atleast 1 small later
            setAuthentication((prev)=>{
                return {...prev,
                pass_small:"Password contain atleast 1 lowercase letter"
                }
            });
        }else{
            setAuthentication((prev)=>{
                return {...prev,
                pass_small:""
                }
            });
        }
        if(!password_ref.current.value.match("[^A-Za-z0-9]")){
            //have atleast 1 special character
            setAuthentication((prev)=>{
                return {...prev,
                pass_special:"Password should contain atleast one special character."
                }
            });
        }else{
            setAuthentication((prev)=>{
                return {...prev,
                pass_special:""
                }
            });
        }
        if(!password_ref.current.value.match("[0-9]")){
            //have atleast1 number
            setAuthentication((prev)=>{
                return {...prev,
                pass_num:"Password should contain atleast one number."
                }
            });

        }else{
            setAuthentication((prev)=>{
                return {...prev,
                pass_num:""
                }
            });
        }
    }

    function checkConfirmPass(){
        if(password_ref.current.value!==confirm_pass_ref.current.value){
            setAuthentication((prev)=>{
                return {...prev,
                confirm_pass_error:"Passwords do not match!!"
                }
            });
        }else{
            setAuthentication((prev)=>{
                return {...prev,
                confirm_pass_error:""
                }
            });
        }
    }

    function submitSignUp(){
        
        if(authentication.email_error==="" && authentication.pass_len==="" && authentication.pass_cap==="" && authentication.pass_small==="" && authentication.pass_special==="" && authentication.pass_num===""){
            setAuthentication((prev)=>{
                return {...prev,
                isLoading:true
            };
            });
        createUserWithEmailAndPassword(auth,email_ref.current.value,password_ref.current.value).then((createdUser)=>{
            console.log(createdUser);
            setUser(createdUser);
            SetIsLoggedIn(true);
            window.localStorage.clear();
            window.localStorage.setItem("AuthUser",JSON.stringify(createdUser));
            window.localStorage.setItem("isLoggedIn",isLoggedIn);
            setAuthentication((prev)=>{
                return {...prev,
                isLoading:true
            };
            });
            
        }).catch((error)=>{
            if(error.code === "auth/email-already-in-use"){
                setAuthentication((prev)=>{
                    return {...prev,
                    authentication_error: "This Email already exists in our database!! Please choose another email to signup, or proceed to the login screen via the link below.",
                    isLoading:false
                };
                });
                email_ref.current.value = "";
                password_ref.current.value = "";
                confirm_pass_ref.current.value = "";
            }
            console.log(error.message);
        });
        
    }
    }

    if(isLoggedIn){
        return <Navigate to="/authentication/verify_email" replace={true} />
    }

    return(
        <div className="signin-form-cont">
    
            {authentication.isLoading===true?<Loader/>:""}
            <div className="signin-form">
            <div>
                <div className="signin-form-title"><h1>Sign up to Rody Realty</h1></div>
                <div>
                    <input className="signin-form-input" placeholder="Email Address" type="text" ref={email_ref} onChange={checkEmail}/>
                    <div>
                    {authentication.email_error!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.email_error}</label></div>:""}
                    </div>
                    <input className="signin-form-input" placeholder="Password" type="password" ref={password_ref} onChange={checkPass}/>
                    <div>
                        {authentication.pass_len!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.pass_len}</label></div>:""}
                        {authentication.pass_cap!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.pass_cap}</label></div>:""}
                        {authentication.pass_small!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.pass_small}</label></div>:""}
                        {authentication.pass_special!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.pass_special}</label></div>:""}
                        {authentication.pass_num!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.pass_num}</label></div>:""}
                    </div>
                    <input className="signin-form-input" placeholder="Confirm Password" type="password" ref={confirm_pass_ref} onChange={checkConfirmPass}/>
                    <div>
                    {authentication.confirm_pass_error!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.confirm_pass_error}</label></div>:""}
                    {authentication.authentication_error!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.authentication_error}</label></div>:""}
                    </div>
                    <input className="signin-form-submit" type="submit" value="Sign up" onClick={submitSignUp}/>
                    
                    <div>
                        <div className="signin-form-social-login"><span><img src={require('../../RESOURCES/facebook.png')} alt="fb"/></span><span className="signin-form-social-login-text">Sign up With Facebook</span></div>
                        <div className="signin-form-social-login"><span><img src={require('../../RESOURCES/google.png')} alt="google"/></span><span className="signin-form-social-login-text">Sign up With Google</span></div>
                        <div className="signin-form-social-login"><span><img src={require('../../RESOURCES/twitter.png')} alt="X"/></span><span className="signin-form-social-login-text">Sign up With Twitter X </span></div>
                    </div>
                    <div className="signin-form-login-page-link"><span>Already have an account? <Link className="signin-form-login-page-link-Link" to="/authentication/login">Log in</Link></span></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Signup;