import {React, useRef, useState} from "react";

function Login() {
/*
  function onButtonClick(e){
    console.log(JSON.stringify(formData));
  }
*/

  //const [formData,setFormData] = useState({});
  const [errors,setErrors] = useState({});

  const email_validation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  let emailVal = useRef("");
  let passVal = useRef("");

  
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
  
  function validateEntries(){

    if(passVal.current.value.length<8){
      setErrors((prev)=>{
        return {...prev,
        passwordError: "Password too short!"
        }
      });
    }else if(passVal.current.value.length>=8){
      setErrors((prev)=>{
        return {...prev,
        passwordError:""
        }
      });
    }

    console.log(JSON.stringify(errors));
  }


    return(
      <div>
        <div>Login</div>
      
      <br />
      <div>
        <input placeholder="Enter your email here" ref={emailVal} onChange={validateEmail}/>
        <label>{errors.emailError}</label>
      </div>
      <br />
      <div>
        <input placeholder="Enter your password here" ref={passVal} onChange={validateEntries} />
        <label>{errors.passwordError}</label>
      </div>
      <br />
      <div>
        <input type="button" value={'Log in'} />
      </div>
    </div>
        
  
  );
};


export default Login;