import { Link, Navigate, useLoaderData } from "react-router-dom";
import { useAuth } from "../MiddlewareApis/AuthContext";
import { useEffect, useState } from "react";

function Nav(props) {

    const AuthenticateContext = useAuth();
    //console.log("Localstorage nav: "+window.localStorage.getItem("isLoggedIn"));
    //console.log(AuthenticateContext);


    const data = useLoaderData();
    console.log(data);
    //console.log(JSON.parse(data)[0]);
    /*
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

    */

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
        loggedIn:false,


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
    //AuthenticateContext.isLoggedIn && <Link className="nav-login" to="#" onClick={expandManagement} >{!(AuthenticateContext.isLoggedIn === undefined || AuthenticateContext.isLoggedIn === null || !AuthenticateContext.isLoggedIn || undefined)

    return <div className="Top-nav">
        <div className="nav-logo"><img src={require('../RESOURCES/logo_white.png')} alt="logo"/></div>
        <div className="nav-links">
            <Link className="nav-link" to="/">Find a property</Link>
            <Link className="nav-link" to="/">Our Team</Link>
            <Link className="nav-link" to="/">For Owners</Link>
            <Link className="nav-link" to="/">About Us</Link>
            
            {(data!==null || data) && <Link className="nav-login" to="#" onClick={expandManagement}> {JSON.parse(data)[0].email}</Link> }
            {(data===null || !data) && <Link className="nav-login" to="/authentication/login">Login</Link>}
        </div>
        <div hidden={!pageMgt.topNavProfileExpand} className="admin-nav-menu">
            <div className="admin-nav-menu-item"><Link className="admin-nav-menu-item-link" to={data!==null && "/user-profile/"+JSON.parse(data)[0].email} onClick={contractManagement}>Manage Profile</Link></div>
            <div className="admin-nav-menu-item"><Link className="admin-nav-menu-item-link" to="#" onClick={logout}>Log Out</Link></div>
        </div>
    </div>
}


export default Nav;

export const navLoader= async ()=>{
    const data = await localStorage.getItem("AuthUser");
    return data;
}