import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";


function AgentsPropertiesPage() {

    return <div style={{marginTop:0,}}>
        <div>
        <div className="agent-dashboard-page-nav">
            <h2>Property Management</h2>
            <div className="agent-dashboard-page-nav-links">
                <NavLink to="my-properties">My Properties</NavLink> |
                <NavLink to="home">My Recently added Properties</NavLink> |
                <NavLink to="new-properties">Add New Property</NavLink> 
            </div>
        </div>
        </div>
        <main>
            <div className="agent-dashboard-page-nav-body"><Outlet/></div>
        </main>
        
        
        
    </div>
}

export default AgentsPropertiesPage;