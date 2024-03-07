

function Signup() {
    return(
        <div>
            <label>EMAIL</label><input id="email_address" type="email"/><br/>
            <label>NAME</label><input id="given_name" type="text"/><br/>
            <input type="submit" value="Add user"/>
        </div>
    );
};

export default Signup;