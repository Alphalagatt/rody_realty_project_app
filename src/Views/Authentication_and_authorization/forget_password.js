import React from "react";

function ForgetPassword() {

    const handleSubmit = async(e)=>{
        e.preventDefault()
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(database,emailVal).then(data=>{
        alert("check your gamil")
        history("/")
    }).catch(err=>{
        alert(err.code)
    })

    }
return(
<div className="App">
    <h1>ForgetPassword</h1>
    <form onSubmit = {(e)=>handleSubmit(e)}>
        <input name="email"/><br/>
        <button>Reset</button>
    </form>
</div>  
 )  
}

export default ForgetPassword;