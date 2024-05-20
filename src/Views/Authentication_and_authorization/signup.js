import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../MiddlewareApis/AuthContext";
import Loader from "../../Components/Loader";
import axios from "axios";
function Signup() {
    let email_ref = useRef("");
    let password_ref = useRef("");
    let confirm_pass_ref = useRef("");
    const givenNameRef = useRef();
    const sirNameRef = useRef();
    const phoneNumberRef = useRef();
    const accountTypeRef = useRef();

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
    
        const handleSignup = async()=>{
            if(authentication.email_error==="" && authentication.pass_len==="" && authentication.pass_cap==="" && authentication.pass_small==="" && authentication.pass_special==="" && authentication.pass_num===""){
            setAuthentication((prev)=>{
              return{...prev,
                isLoading:true,
              }
            })
        
           await axios.post("http://www.localhost:5000/registration/user_details/new_user",{
              email:email_ref.current.value,
              givenName:givenNameRef.current.value,
              sirName:sirNameRef.current.value,
              phoneNumber:phoneNumberRef.current.value,
              accountType: accountTypeRef.current.value,
              password: password_ref.current.value,
            }).then((result)=>{
              //setUser(result);
              //window.localStorage.setItem("AuthUser",JSON.stringify(user));
              setAuthentication((prev)=>{
                return{...prev,
                  isLoading:false,
                  message:" User Successfully Added!!"
                }
              });
              //SetIsLoggedIn(true);
              //window.localStorage.setItem("isLoggedIn",true);
              //console.log(JSON.stringify(result));
        
              //email_ref.current.value = "";
              //givenNameRef.current.value = "";
              //sirNameRef.current.value = "";
              //phoneNumberRef.current.value = "";
              //password_ref.current.value = "";
              //accountTypeRef.current.value = "";
        
            }).then(()=>{
                axios.post("http://www.localhost:5000/registration/login",{
                email:email_ref.current.value,
                password:password_ref.current.value
                }).then(async (respose)=>{
                if(respose.data.length <=0){
                
                }else{
                console.log(respose.data[0].accountType);
                await setUser(respose.data);
                await SetIsLoggedIn(true);
                await window.localStorage.setItem("AuthUser",JSON.stringify(respose.data));
                await window.localStorage.setItem("isLoggedIn",true);
            }
         });
    }).catch((err)=>{
              setAuthentication((prev)=>{
                return{...prev,
                  isLoading:false,
                }
              })
              console.log("Error: "+err);
            });
        }
        }

    if(isLoggedIn){
        return <Navigate to="/" replace={true} />
    }

    return(
        <div className="signin-form-cont">
    
            {authentication.isLoading===true?<Loader/>:""}
            <div className="signin-form">
            <div>
            <div className="signup-form-logo">
                <img className="admin-logo" src={require("../../RESOURCES/logo.png")} alt="Login" />
                <div><h4>Sign up to Rody Realty</h4></div>
            </div>
                
                <div>
                    <input className="signin-form-input" placeholder="Email Address" type="text" ref={email_ref} onChange={checkEmail}/>
                    <div>
                    {authentication.email_error!==""?<div><label className="sign-in-error"><span><img className="sign-in-error-icon" src={require("../../RESOURCES/errorIcon.png")} alt=""/></span>{authentication.email_error}</label></div>:""}
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
                            <option>User</option>
                        </select>
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
                    <input className="signin-form-submit" type="submit" value="Sign up" onClick={handleSignup}/>
                    
                    <div className="signin-form-login-page-link"><span>Already have an account? <Link className="signin-form-login-page-link-Link" to="/authentication/login">Log in</Link></span></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Signup;