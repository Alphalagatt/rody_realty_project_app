import { NavLink, Outlet } from "react-router-dom";

function AgentsLandlordsPage() {
    return<div>
        <div className="agent-dashboard-management-forms-top-nav-1">
            <h2>Manage Landlords</h2>
            <div className="agent-dashboard-management-forms-top-nav">
                <NavLink to="/agent-dashboard/properties">My Properties</NavLink> |
                <NavLink to="/agent-dashboard/properties">My Recently added Properties</NavLink> |
                <NavLink to="new-properties">Add New Property</NavLink> 
            </div>
        </div>
        <Outlet/>
    </div>
}

export default AgentsLandlordsPage;