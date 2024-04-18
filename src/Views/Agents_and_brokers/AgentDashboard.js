
import AgentsTopNav from "./AgentsTopNav";
import { Outlet } from "react-router-dom";

function AgentDashboard() {

    return<div  className="agent-dashboard">
        <AgentsTopNav/>
        <div className="agent-dashboard-body">
            <Outlet/>
        </div>
        
        
    </div>
}

export default AgentDashboard;