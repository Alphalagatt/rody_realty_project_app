import { Link } from "react-router-dom";

function Nav() {
    return <div className="Top-nav">
        <div className="nav-logo"><img src={require('../RESOURCES/logo_white.png')} alt="logo"/></div>
        <div className="nav-links">
            <Link className="nav-link" to="/">Find a property</Link>
            <Link className="nav-link" to="/">Our Team</Link>
            <Link className="nav-link" to="/">For Owners</Link>
            <Link className="nav-link" to="/">About Us</Link>
            <Link className="nav-login" to="/authentication/login">Login</Link>
        </div>
    </div>
}


export default Nav;