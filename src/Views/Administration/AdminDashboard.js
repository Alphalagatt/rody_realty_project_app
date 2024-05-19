import React, { useState } from "react";
import {Link, NavLink, Navigate, Outlet} from "react-router-dom"

const AdminDashboard = (props) => {

    const [pageMgt,setPageMgt] = useState({
        enquiriesOpen:false,
        sideNavExpand:false,
        sideNav:{
            expandProperties:false,
            expandAgents:false,
            expandTenants:false,
            expandLandlords:false,
            expandUsers:false
        },
        topNavProfileExpand:false,
        logout:false,
        loading:false
    });
    const enq_click = ()=>{
        const enq_val = !pageMgt.enquiriesOpen;
        setPageMgt(prev=>{
            return {...prev,
            enquiriesOpen:enq_val,
            }
        })
    }
    const expandSideNav = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNavExpand:true,
            }
        })
    }
    const contractSideNav = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNavExpand:false,
                sideNav:{
                    expandProperties:false,
                    expandAgents:false,
                    expandTenants:false,
                    expandLandlords:false,
                    expandUsers:false
                },
            }
        })
    }
    const expandProperties = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNav:{
                    expandProperties:true,
                    expandAgents:false,
                    expandTenants:false,
                    expandLandlords:false,
                    expandUsers:false
                },
            }
        })
    }
    const expandAgents = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNav:{
                    expandProperties:false,
                    expandAgents:true,
                    expandTenants:false,
                    expandLandlords:false,
                    expandUsers:false
                },
            }
        })
    }
    const expandTenants = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNav:{
                    expandProperties:false,
                    expandAgents:false,
                    expandTenants:true,
                    expandLandlords:false,
                    expandUsers:false
                },
            }
        })
    }
    const expandLandlords = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNav:{
                    expandProperties:false,
                    expandAgents:false,
                    expandTenants:false,
                    expandLandlords:true,
                    expandUsers:false
                },
            }
        })
    }
    const expandUsers = ()=>{
        setPageMgt(prev=>{
            return {...prev,
                sideNav:{
                    expandProperties:false,
                    expandAgents:false,
                    expandTenants:false,
                    expandLandlords:false,
                    expandUsers:true
                },
            }
        })
    }
    const expandManagement = ()=>{
        const topexp = !pageMgt.topNavProfileExpand
        setPageMgt(prev=>{
            return {...prev,
                topNavProfileExpand:topexp,
            }
        })
    }
    const contractManagement = ()=>{
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


  return (
    <div>
        <div className="admin-nav">
        <div className="nav-logo"><Link to="/admin-dashboard"><img src={require('../../RESOURCES/logo_white.png')} alt="logo"/></Link></div>
        <div className="nav-links">
            <NavLink className="admin-nav-link" to="properties">Properties</NavLink>
            <NavLink className="admin-nav-link" to="agents">Agents</NavLink>
            <NavLink className="admin-nav-link" to="tenants">Tenants</NavLink>
            <NavLink className="admin-nav-link" to="">Landlords</NavLink>
            <NavLink className="admin-nav-link" to="">Users</NavLink>
            <NavLink className="admin-nav-link" to="#" onClick={expandManagement}>{JSON.parse(localStorage.getItem("AuthUser"))[0].email}</NavLink>
        </div>
        <div hidden={!pageMgt.topNavProfileExpand} className="admin-nav-menu">
            <div className="admin-nav-menu-item"><NavLink className="admin-nav-menu-item-link" to="manage-profile" onClick={contractManagement}>Manage Profile</NavLink></div>
            <div className="admin-nav-menu-item"><NavLink className="admin-nav-menu-item-link" to="#" onClick={logout}>Log Out</NavLink></div>
        </div>
        </div>

        <div className={!pageMgt.enquiriesOpen? "admin-inquiries":"admin-inquiries-open"} onClick={enq_click}>Enquiries</div>
        <div className={pageMgt.sideNavExpand? "admin-side-nav-enter":"admin-side-nav"}  onMouseEnter={expandSideNav} onMouseLeave={contractSideNav}>
            <div className="admin-side-nav-menu-item">
                <div className="admin-side-nav-menu-item-title" onClick={expandProperties}>
                    <img src={require("../../RESOURCES/Admin-Properties.png")} alt="p"/>
                    <div className="admin-side-nav-menu-item-title-text" hidden={!pageMgt.sideNavExpand}>Properties</div>
                </div>
                <div hidden={!pageMgt.sideNavExpand} className="admin-side-nav-menu-item-menu">
                    <ul hidden={!pageMgt.sideNav.expandProperties}>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink to="/admin-dashboard/properties/" className="admin-side-nav-menu-item-menu-li"> Properties </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink to="/admin-dashboard/properties/new-property" className="admin-side-nav-menu-item-menu-li"> New Property </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Recent Properties </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Search Properties </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> For Rent </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> For Sale </NavLink></li>
                    </ul>
                </div> 
            </div>
            <div className="admin-side-nav-menu-item">
                <div className="admin-side-nav-menu-item-title" onClick={expandAgents}>
                    <img src={require("../../RESOURCES/AdminAgents.png")} alt="p"/>
                    <div className="admin-side-nav-menu-item-title-text" hidden={!pageMgt.sideNavExpand}>Agents</div>
                </div>
                <div hidden={!pageMgt.sideNavExpand} className="admin-side-nav-menu-item-menu">
                    <ul hidden={!pageMgt.sideNav.expandAgents}>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink to="agents" className="admin-side-nav-menu-item-menu-li" > All Agents </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Add Agent </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Agents Perfomance </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Search Agent </NavLink></li>
                    </ul>
                </div> 
            </div>
            <div className="admin-side-nav-menu-item">
                <div className="admin-side-nav-menu-item-title" onClick={expandTenants}>
                    <img src={require("../../RESOURCES/Admin-Tenants.png")} alt="p"/>
                    <div className="admin-side-nav-menu-item-title-text" hidden={!pageMgt.sideNavExpand}>Tenants</div>
                </div>
                <div hidden={!pageMgt.sideNavExpand} className="admin-side-nav-menu-item-menu">
                    <ul hidden={!pageMgt.sideNav.expandTenants}>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink to="/admin-dashboard/tenants/all-tenants" className="admin-side-nav-menu-item-menu-li"> All Tenants </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Add Tenant </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Payment History </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Search Tenant </NavLink></li>
                    </ul>
                </div> 
            </div>
            <div className="admin-side-nav-menu-item">
                <div className="admin-side-nav-menu-item-title" onClick={expandLandlords}>
                    <img src={require("../../RESOURCES/Admin-Landlords.png")} alt="p"/>
                    <div className="admin-side-nav-menu-item-title-text" hidden={!pageMgt.sideNavExpand}>Landlords</div>
                </div>
                <div hidden={!pageMgt.sideNavExpand} className="admin-side-nav-menu-item-menu">
                    <ul hidden={!pageMgt.sideNav.expandLandlords}>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> All Landlords </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Add Landlord </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Payment History </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Search Landlord </NavLink></li>
                    </ul>
                </div> 
            </div>
            <div className="admin-side-nav-menu-item">
                <div className="admin-side-nav-menu-item-title" onClick={expandUsers}>
                    <img src={require("../../RESOURCES/Admin-Users.png")} alt="p"/>
                    <div className="admin-side-nav-menu-item-title-text" hidden={!pageMgt.sideNavExpand}>Users</div>
                </div>
                <div hidden={!pageMgt.sideNavExpand} className="admin-side-nav-menu-item-menu">
                    <ul hidden={!pageMgt.sideNav.expandUsers}>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li" to="/admin-dashboard/users"> Users </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li" to="/admin-dashboard/users/new-user"> New User </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li" to="/admin-dashboard/users/enquiries"> User Enquiries </NavLink></li>
                        <li className="admin-side-nav-menu-item-menu-li"><NavLink className="admin-side-nav-menu-item-menu-li"> Search User </NavLink></li>
                    </ul>
                </div> 
            </div>
        </div>

        {pageMgt.loading && <div><div className="admin-signup-form-loading"><img src={require("../../RESOURCES/houseLoading.gif")} alt="loading.."/> </div></div>}
        <Outlet/>
        
    </div>
  )
};

export default AdminDashboard;
