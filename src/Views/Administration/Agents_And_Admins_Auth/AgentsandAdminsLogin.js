import React from "react";
import { useState, useRef } from "react";
import { useAuth } from "../../../MiddlewareApis/AuthContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const AgentsandAdminsLogin = (props) => {


  //Declearing Variables and constants..
  const [errors,setErrors] = useState({
    emailError:"",
    loginError:"",
    viewPass:false
  });


  const  {user, setUser,isLoggedIn,SetIsLoggedIn} = useAuth();
  
  setUser()

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
    axios.post("http://www.localhost:5000/registration/login",{
        email:emailVal.current.value,
        password:passVal.current.value
    }).then((respose)=>{
        if(respose.data.length <=0){
            setErrors((prev)=>{
                return {...prev,
                loginError: "Wrong Email or Password Please try Again"
                }
              })
              passVal.current.value = "";
        }else{
            console.log(respose.data[0].accountType);
            setUser(respose.data);
            SetIsLoggedIn(true);
            window.localStorage.setItem("AuthUser",JSON.stringify(respose.data));
            window.localStorage.setItem("isLoggedIn",true);
        }
    })
  };

  if(isLoggedIn){
    if(user[0].accountType==="Administrator"){
      return <Navigate to="/admin-dashboard" />
    }else if(user[0].accountType==="Agent"){
      return <Navigate to="/agent-dashboard" />
    }
  }
  


  return (
    <div className="admin-signin-form">
        <img className="admin-logo" src={require("../../../RESOURCES/logo.png")} alt="Login" />
        <div><h4>Login</h4></div>
      
      <br />
      <div>
        <input className="signin-form-input" placeholder="Enter your email here" ref={emailVal} onChange={validateEmail}/>
        {errors.emailError!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../../RESOURCES/errorIcon.png")} alt=""/></span>{errors.emailError}</label></div>:""}
        {console.log(errors.emailError)}
      </div>
      <br />
      <div>
        <input className="signin-form-input" placeholder="Enter your password here" type="password" ref={passVal} />{errors.viewPass?<span><img onClick={viewPassword} className="sign-in-view-pass" src={require("../../../RESOURCES/icons8-eye-100.png")} alt=""/></span>:<span><img onClick={viewPassword} className="sign-in-view-pass" src={require("../../../RESOURCES/icons8-closed-eye-100.png")} alt=""/></span>}
        <div><label className="sign-in-error">{errors.loginError!==""?<span><img className="sign-in-error-icon" src={require("../../../RESOURCES/errorIcon.png")} alt=""/></span>:"" } {errors.loginError}</label></div>
      </div>
      <br />
      <div>
        <input className="signin-form-submit" type="button" value={'Log in'} onClick={loginClick}/>
      </div>
      <div>
        <div className="signin-form-emphasis-container"><Link className="signin-form-emphasis" to="/authentication/forget_password"> Forgot Your Password? </Link></div>
      </div>
    </div>
  )
};

export default AgentsandAdminsLogin;
