import { Link } from "react-router-dom";

function Nav() {
    return <div className="Top-nav">
        <Link to="/">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/forget_password">Forget Password</Link>
        <Link to="/account_management_page">Account Management</Link>
    </div>
}


export default Nav;