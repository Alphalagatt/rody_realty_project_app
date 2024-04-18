import { NavLink, Outlet } from "react-router-dom";

function AgentsTenantsPage() {
    return<div>
        <div className="agent-dashboard-management-forms-top-nav-1">
            <h2>Manage Tenants</h2>
            <div className="agent-dashboard-management-forms-top-nav">
                <NavLink to="all-tenants">All Tenants</NavLink> |
                <NavLink to="find-tenant">Add New Tenant</NavLink> 
            </div>
        </div>
        <Outlet/>
    </div>
}

export default AgentsTenantsPage;