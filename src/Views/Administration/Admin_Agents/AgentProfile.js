import React from "react"
import { NavLink, Outlet, useParams } from "react-router-dom";

function AgentProfile(props){
  const params = useParams();
  console.log(params.id)
  return (
    <div className="admin-agent-profile-cont">
      <div className="admin-agent-profile-tab-menu">
        <NavLink to="my-properties">My Properties</NavLink>
        <NavLink to="for-rent">For Rent</NavLink>
        <NavLink to="rented">Rented</NavLink>
        <NavLink to="for-sale">For Sale</NavLink>
        <NavLink to="sold">Sold</NavLink>
        <NavLink to="my-tenants">My Tenants</NavLink>
        <NavLink to="my-landlords">My Landlords</NavLink>
      </div>
      <div className="admin-agent-profile-info">
        <div className="admin-agent-profile-info-photo-cont">
            <img src={require("../../../RESOURCES/Hardika_Headshot.jpeg")} alt="." />
        </div>
        <div>
            <div className="admin-agent-profile-info-name">
                <h1>Hardika Pareek</h1>
                <p>Real Estate Agent -Rody RE</p>
            </div>
            <div className="admin-agent-profile-info-more-info-cont">
                <div className="admin-agent-profile-info-more-info border-right">
                  <h4>Total Value Brought In</h4>
                  <h2>$2,456,000.00</h2>
                  <div>
                  <h4>Number of Properties</h4>
                  <p>24</p>
                  </div>
                </div>
                <div className="admin-agent-profile-info-more-info">
                  <h4>INFO</h4>
                  <p>Email: johndoe@example.com</p>
                  <p>Phone: 0412345678</p>
                  <p>Address: 43a woodstock street guildford</p>
                  <p>Age: 32</p>
                </div>
                <div className="admin-agent-profile-info-more-info border-left">
                  <h4>ACTIVITY</h4>
                  <p>Meeting with client this Afternoon to show them the new Investment property</p>
                </div>
            </div>
        </div>
      </div>
      <div className="admin-agent-profile-management">
        <h4>Managed Properties Landlords and Tenants</h4>
        <Outlet/>
      </div>
    </div>
  )
};

export default AgentProfile;
