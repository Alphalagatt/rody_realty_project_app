import { Link } from "react-router-dom";
import { useAuth } from "../MiddlewareApis/AuthContext";

function Nav() {

    const AuthenticateContext = useAuth();
    console.log("Localstorage nav: "+window.localStorage.getItem("isLoggedIn"));

    return <div className="Top-nav">
        <div className="nav-logo"><img src={require('../RESOURCES/logo_white.png')} alt="logo"/></div>
        <div className="nav-links">
            <Link className="nav-link" to="/">Find a property</Link>
            <Link className="nav-link" to="/">Our Team</Link>
            <Link className="nav-link" to="/">For Owners</Link>
            <Link className="nav-link" to="/">About Us</Link>
            {AuthenticateContext.isLoggedIn && <Link>{JSON.parse(AuthenticateContext.user)[0].email}</Link> }
            {(AuthenticateContext.isLoggedIn === undefined || AuthenticateContext.isLoggedIn === null || !AuthenticateContext.isLoggedIn || undefined) && <Link className="nav-login" to="/authentication/login">Login</Link>}
        </div>
    </div>
}


export default Nav;