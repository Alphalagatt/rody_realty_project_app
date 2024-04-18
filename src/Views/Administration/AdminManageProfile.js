import React, { useEffect } from "react";
import { useRef,useState } from "react";
import axios from "axios";

const AdminManageProfile = (props) => {
    
  const [formControl,setFormControl] = useState({
    loading:false,
    isLoggedIn:false,
    user:{
      email:"",
      givenName:"",
      sirName:"",
      phoneNumber:"",
    }
  })

  const myUser = JSON.parse(localStorage.getItem("AuthUser"));

  const emailref = useRef(myUser[0].email);
  const givenNameRef = useRef(myUser[0].givenName);
  const sirNameRef = useRef(myUser[0].sirName);
  const phoneNumberRef = useRef(myUser[0].phoneNumber);
  const passwordRef = useRef();

  

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
      password: passwordRef.current.value,
    }).then((result)=>{
      setFormControl((prev)=>{
        return{...prev,
          loading:false
        }
      })
      console.log(JSON.stringify(result));

    }).catch((err)=>{
      setFormControl((prev)=>{
        return{...prev,
          loading:false,
        }
      })
      console.log("Error: "+err);
    });
  }

  useEffect(()=>{
    setFormControl(prev=>{
      return {...prev,
        user:myUser[0]
      }
    })
  },[]);
  

  return (
    <div className="admin-body">
    {formControl.loading && <div>
      <div className="admin-signup-form-loading"><img src={require("../../RESOURCES/houseLoading.gif")} alt="loading.."/> </div>
      
    </div>}
    <div className="admin-update-form">
      <div>
        <input className="signin-form-input" placeholder="Enter your email here" value={formControl.user.email} ref={emailref} disabled={true} />
      </div>

      <div className="">
        <input className="signin-form-input" placeholder="SirName" value={formControl.user.sirName} ref={sirNameRef} disabled={true} />
        <input className="signin-form-input" placeholder="Given Names" value={formControl.user.givenName} ref={givenNameRef} disabled={true} />
      </div>

      <div>
        <input className="signin-form-input" placeholder="Phone Number" value={formControl.user.phoneNumber} ref={phoneNumberRef} disabled={true} />
      </div>

      <input className="signin-form-input" placeholder="Password" type="password" ref={passwordRef}/>
      
      <input className="signin-form-input" placeholder="Confirm Password" type="password" />
      
      <input className="signin-form-submit" type="submit" value="Update Profile" onClick={handleSignup} disabled={true} />
    </div>
    </div>
  )

};

export default AdminManageProfile;
