import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../MiddlewareApis/AuthContext";
import { useState } from "react";

function Nav(props) {

    const AuthenticateContext = useAuth();
    console.log("Localstorage nav: "+window.localStorage.getItem("isLoggedIn"));
    console.log(AuthenticateContext);

    if(AuthenticateContext.isLoggedIn || window.localStorage.getItem("isLoggedIn")){
        const account = ()=>{
            if(!window.localStorage.getItem("AuthUser")){
                setPageMgt(prev=>{
                    return {...prev,
                        logout:true,
                        email:""
                    }
                })
                return "";
            }
            
            else{
                setPageMgt(prev=>{
                    return {...prev,
                        logout:false,
                        email:JSON.parse(window.localStorage.getItem("AuthUser"))[0].email
                    }
                })
                return JSON.parse(window.localStorage.getItem("AuthUser"))[0].accountType;
            }
        }
        
        
    }

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
        loading:false,


    });

    const logout = async ()=>{
        localStorage.clear();
        setPageMgt(prev=>{
            return {...prev,
                logout:true,
            }
        })
        window.location.reload();
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
    

    return <div className="Top-nav">
        <div className="nav-logo"><img src={require('../RESOURCES/logo_white.png')} alt="logo"/></div>
        <div className="nav-links">
            <Link className="nav-link" to="/">Find a property</Link>
            <Link className="nav-link" to="/">Our Team</Link>
            <Link className="nav-link" to="/">For Owners</Link>
            <Link className="nav-link" to="/">About Us</Link>
            {AuthenticateContext.isLoggedIn && <Link className="nav-login" to="#" onClick={expandManagement} >{!(AuthenticateContext.isLoggedIn === undefined || AuthenticateContext.isLoggedIn === null || !AuthenticateContext.isLoggedIn || undefined) && JSON.parse(AuthenticateContext.user)[0].email}</Link> }
            {(AuthenticateContext.isLoggedIn === undefined || AuthenticateContext.isLoggedIn === null || !AuthenticateContext.isLoggedIn || undefined) && <Link className="nav-login" to="/authentication/login">Login</Link>}
        </div>
        <div hidden={!pageMgt.topNavProfileExpand} className="admin-nav-menu">
            <div className="admin-nav-menu-item"><Link className="admin-nav-menu-item-link" to={!(AuthenticateContext.isLoggedIn === undefined || AuthenticateContext.isLoggedIn === null || !AuthenticateContext.isLoggedIn || undefined) && "/user-profile/"+JSON.parse(AuthenticateContext.user)[0].email} onClick={contractManagement}>Manage Profile</Link></div>
            <div className="admin-nav-menu-item"><Link className="admin-nav-menu-item-link" to="#" onClick={logout}>Log Out</Link></div>
        </div>
    </div>
}


export default Nav;