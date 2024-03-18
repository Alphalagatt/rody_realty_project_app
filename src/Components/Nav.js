import { Link } from "react-router-dom";

function Nav() {
    return <div className="Top-nav">
        <Link to="/authentication/signup">Signup</Link>
        <Link to="/authentication/login">Login</Link>
    </div>
}


export default Nav;