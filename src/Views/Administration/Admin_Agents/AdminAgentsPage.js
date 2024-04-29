import React from "react"
import { NavLink, Outlet } from "react-router-dom";

const AdminAgentsPage = (props) => {
  return (
    <div className="admin-body">
        <div className="Agents-page-header">
          <NavLink to="agent-profile/1234"> To profile</NavLink>
          <NavLink to="summary"> To summary</NavLink>
          <div></div>
        </div>
        <Outlet/>
    </div>
  )
};

export default AdminAgentsPage;