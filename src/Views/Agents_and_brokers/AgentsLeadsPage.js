import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

function AgentsLeadsPage() {
    return<div>
        <div className="agent-dashboard-management-forms-top-nav-1">
            <h2>Manage Leads</h2>
            <div className="agent-dashboard-management-forms-top-nav">
                <NavLink to="/properties">My Properties</NavLink> |
                <NavLink to="/properties">My Recently added Properties</NavLink> |
                <NavLink to="new-properties">Add New Property</NavLink> 
            </div>
        </div>
        <Outlet/>
    </div>
}

export default AgentsLeadsPage;