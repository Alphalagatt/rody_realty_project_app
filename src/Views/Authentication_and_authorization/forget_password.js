import { useRef, useState } from "react";

function ForgetPassword() {
    //Declearing Variables and constants..
  const [errors,setErrors] = useState({
    pass_len:"",
    pass_cap:"",
    pass_num:"",
    pass_small:"",
    pass_special:"",
    confirm_pass_error:"",
    authentication_error:"",
    viewPass:false,
    viewConfirmPass:false
  });

  const email_validation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  let confirmPassVal = useRef("");
  let passVal = useRef("");


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

  function viewConfirmPassword(){
    if(errors.viewConfirmPass===false){
      confirmPassVal.current.type = "text";
      setErrors((prev)=>{
        return {...prev,
          viewConfirmPass:true
        };
      });
    }
    if(errors.viewConfirmPass===true){
      confirmPassVal.current.type = "password";
      setErrors((prev)=>{
        return {...prev,
          viewConfirmPass:false
        };
      });
    }
    console.log(errors.viewConfirmPass);
  }

    return(
        <div className="signin-form">
          <div className="signin-form-title"><h1>Reset Password</h1></div>
        
        <br />
        <div>
          <input className="signin-form-input" placeholder="Enter your new password here" type="password" ref={passVal} />{errors.viewPass?<span><img onClick={viewPassword} className="sign-in-view-pass" src={require("../../RESOURCES/icons8-eye-100.png")} alt=""/></span>:<span><img onClick={viewPassword} className="sign-in-view-pass" src={require("../../RESOURCES/icons8-closed-eye-100.png")} alt=""/></span>}
          
        </div>
        <br />
        <div>
          <input className="signin-form-input" placeholder="Confirm your new password here" type="password" ref={confirmPassVal} />{errors.viewConfirmPass?<span><img onClick={viewConfirmPassword} className="sign-in-view-pass" src={require("../../RESOURCES/icons8-eye-100.png")} alt=""/></span>:<span><img onClick={viewConfirmPassword} className="sign-in-view-pass" src={require("../../RESOURCES/icons8-closed-eye-100.png")} alt=""/></span>}
          
        </div>
        <br />
        <div>
          <input className="signin-form-submit" type="button" value={'Save New Password'} />
        </div>
        
        </div>
          
    
    );
}

export default ForgetPassword;