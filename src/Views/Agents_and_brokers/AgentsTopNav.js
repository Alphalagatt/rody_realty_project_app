import { NavLink } from "react-router-dom";

function AgentsTopNav() {
    return <div className="agents-Top-nav">
        <img src={require("../../RESOURCES/logo_white.png")} alt="logo"/>
    
        <div className="agents-Top-nav-links">
            <NavLink className="agents-Top-nav-link" to="/">Reports</NavLink>
            <NavLink className="agents-Top-nav-link" to="properties" a>Properties</NavLink>
            <NavLink className="agents-Top-nav-link" to="landlords"> Landlords</NavLink>
            <NavLink className="agents-Top-nav-link" to="tenants">Tenants</NavLink>
            <NavLink className="agents-Top-nav-link" to="leads">Leads</NavLink>

            <img src={require("../../RESOURCES/Alpha_Headshot.jpg")} alt="." style={{width:30,borderRadius:20}} />
        </div>
</div>
}

export default AgentsTopNav;