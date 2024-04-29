import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

function AgentsTopNav() {

    const [pageMgt,setPageMgt] = useState({
        topNavProfileExpand:false,
        logout:false
    });

    const expandManagement = ()=>{
        const topexp = !pageMgt.topNavProfileExpand
        setPageMgt(prev=>{
            return {...prev,
                topNavProfileExpand:topexp,
            }
        })
    }

    const logout = ()=>{
        localStorage.clear();
        setPageMgt(prev=>{
            return {...prev,
                logout:true,
            }
        })
        const topexp = !pageMgt.topNavProfileExpand
        
    }

    if(pageMgt.logout){
        return <Navigate to="/"/>
    }

    return <div className="agents-Top-nav">
        <img src={require("../../RESOURCES/logo_white.png")} alt="logo"/>
    
        <div className="agents-Top-nav-links">
            <NavLink className="agents-Top-nav-link" to="/">Reports</NavLink>
            <NavLink className="agents-Top-nav-link" to="properties" a>Properties</NavLink>
            <NavLink className="agents-Top-nav-link" to="landlords"> Landlords</NavLink>
            <NavLink className="agents-Top-nav-link" to="tenants">Tenants</NavLink>
            <NavLink className="agents-Top-nav-link" to="leads">Leads</NavLink>
            <NavLink className="admin-nav-link" to="#" onClick={expandManagement}>{JSON.parse(localStorage.getItem("AuthUser"))[0].email}</NavLink>
            
            <div hidden={!pageMgt.topNavProfileExpand} className="admin-nav-menu">
                <div className="admin-nav-menu-item"><NavLink className="admin-nav-menu-item-link" to="#" onClick={logout}>Log Out</NavLink></div>
            </div>
        </div>
</div>
}

export default AgentsTopNav;