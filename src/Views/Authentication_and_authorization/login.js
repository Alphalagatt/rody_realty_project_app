

import { FacebookAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import {React, useRef, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import auth from "../../MiddlewareApis/Firebase";
import { useAuth } from "../../MiddlewareApis/AuthContext";

function Login() {

  //Declearing Variables and constants..
  const [errors,setErrors] = useState({
    emailError:"",
    loginError:"",
    viewPass:false
  });

  const  {user, setUser,isLoggedIn,SetIsLoggedIn} = useAuth();
  

  const email_validation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  let emailVal = useRef("");
  let passVal = useRef("");

//Functions...

//viewPassword - turns on and off the view password button on the side of the password input box.
function viewPassword(){
  if(errors.viewPass===false){
    passVal.current.type = "text";
    setErrors((prev)=>{
      return {...prev,
        viewPass:true
      };
    });
  }
  if(errors.viewPass===true){
    passVal.current.type = "password";
    setErrors((prev)=>{
      return {...prev,
        viewPass:false
      };
    });
  }
  console.log(errors.viewPass);
}

//Validate email -  Uses different methods to verify the users input for strong passwords results.

  function validateEmail(){
    if(emailVal.current.value.match(email_validation)){
      setErrors((prev)=>{
        return {...prev,
        emailError: ""
        }
      })
    }else if(!emailVal.current.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
      setErrors((prev)=>{
        return {...prev,
          emailError: "Invalid Email!"
        };
      });
    }
    console.log(JSON.stringify(errors));
  }

  //Login action button..
  
  function loginClick(){
    signInWithEmailAndPassword(auth,emailVal.current.value,passVal.current.value).then((currentUser)=>{
      
      console.log(currentUser);
      setUser(currentUser);
      SetIsLoggedIn(true);
      window.localStorage.setItem("AuthUser",JSON.stringify(currentUser));
      window.localStorage.setItem("isLoggedIn",true);
    }).catch((err)=>{
      setErrors((prev)=>{
        return {...prev,
        loginError:"Wrong email or password please try again!!"
      }
      });
      passVal.current.value = "";
      console.log(err);

    });
  };

  //login with facebook action function..

  const FacebookProvider = new FacebookAuthProvider();

  

  //Helper methods for rendering outputs to the screen.

  if(isLoggedIn){
    return <Navigate to="/user-dashboard/"/>
  };

    return(
      <div className="signin-form">
        <div className="signin-form-title"><h1>Login</h1></div>
      
      <br />
      <div>
        <input className="signin-form-input" placeholder="Enter your email here" ref={emailVal} onChange={validateEmail}/>
        {errors.emailError!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{errors.emailError}</label></div>:""}
        {console.log(errors.emailError)}
      </div>
      <br />
      <div>
        <input className="signin-form-input" placeholder="Enter your password here" type="password" ref={passVal} />{errors.viewPass?<span><img onClick={viewPassword} className="sign-in-view-pass" src={require("../../RESOURCES/icons8-eye-100.png")} alt=""/></span>:<span><img onClick={viewPassword} className="sign-in-view-pass" src={require("../../RESOURCES/icons8-closed-eye-100.png")} alt=""/></span>}
        <div><label className="sign-in-error">{errors.loginError!==""?<span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>:"" } {errors.loginError}</label></div>
      </div>
      <br />
      <div>
        <input className="signin-form-submit" type="button" value={'Log in'} onClick={loginClick}/>
      </div>
      <div>
        <div className="signin-form-emphasis-container"><Link className="signin-form-emphasis" to="/authentication/forget_password"> Forgot Your Password? </Link></div>
      </div>
      <div>
          <div className="signin-form-social-login"><span><img src={require('../../RESOURCES/facebook.png')} alt="fb"/></span><span className="signin-form-social-login-text">Sign up With Facebook</span></div>
          <div className="signin-form-social-login"><span><img src={require('../../RESOURCES/google.png')} alt="google"/></span><span className="signin-form-social-login-text">Sign up With Google</span></div>
          <div className="signin-form-social-login"><span><img src={require('../../RESOURCES/twitter.png')} alt="X"/></span><span className="signin-form-social-login-text">Sign up With Twitter X </span></div>
      </div>
      <div className="signin-form-login-page-link"><span>New to the website? <Link className="signin-form-login-page-link-Link" to="/authentication/signup">Sign up</Link></span></div>
    </div>
        
  
  );
};


export default Login;