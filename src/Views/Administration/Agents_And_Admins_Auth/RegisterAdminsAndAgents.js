
import axios from "axios";
import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom"


const RegisterAdminsAndAgents = (props) => {

  const [formControl,setFormControl] = useState({
    loading:false,
    isLoggedIn:false,
    message:""
  })

  const emailref = useRef();
  const givenNameRef = useRef();
  const sirNameRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const accountTypeRef = useRef();

  function handleSignup(){
    setFormControl((prev)=>{
      return{...prev,
        loading:true,
      }
    })

    axios.post("http://www.localhost:5000/registration/user_details/new_user",{
      email:emailref.current.value,
      givenName:givenNameRef.current.value,
      sirName:sirNameRef.current.value,
      phoneNumber:phoneNumberRef.current.value,
      accountType: accountTypeRef.current.value,
      password: passwordRef.current.value,
    }).then((result)=>{
      setFormControl((prev)=>{
        return{...prev,
          loading:false,
          message:" User Successfully Added!!"
        }
      })
      console.log(JSON.stringify(result));

      emailref.current.value = "";
      givenNameRef.current.value = "";
      sirNameRef.current.value = "";
      phoneNumberRef.current.value = "";
      passwordRef.current.value = "";
      accountTypeRef.current.value = "";

    }).catch((err)=>{
      setFormControl((prev)=>{
        return{...prev,
          loading:false,
        }
      })
      console.log("Error: "+err);
    });
  }

  if(formControl.isLoggedIn){
    return <Navigate to="/agent-dashboard"/>
  }

  

  return (
    <div className="admin-body">
    {formControl.loading && <div>
      <div className="admin-signup-form-loading"><img src={require("../../../RESOURCES/houseLoading.gif")} alt="loading.."/> </div>
      

    </div>}
    <div className="admin-update-form">
        <h4>Register Administrators and Agents</h4>
        <p>{formControl.message}</p>
      <div>
        <input className="signin-form-input" placeholder="Enter your email here" ref={emailref}/>
      </div>

      <div className="">
        <input className="signin-form-input" placeholder="SirName" ref={sirNameRef}/>
        <input className="signin-form-input" placeholder="Given Names" ref={givenNameRef}/>
      </div>

      <div>
        <input className="signin-form-input" placeholder="Phone Number" ref={phoneNumberRef}/>
      </div>

      <div>
        <select className="signin-form-input" placeholder="Role" ref={accountTypeRef}>
          <option>Administrator</option>
          <option>Agent</option>
        </select>
      </div>

      <input className="signin-form-input" placeholder="Password" type="password" ref={passwordRef}/>
      
      <input className="signin-form-input" placeholder="Confirm Password" type="password" />
      
      <input className="signin-form-submit" type="submit" value="Sign up" onClick={handleSignup} />
    </div>
    </div>
  )
  
};

export default RegisterAdminsAndAgents;
