import React from "react"
import { NavLink, Outlet } from "react-router-dom";

const AgentProfile = (props) => {
  return (
    <div className="admin-body">
      <div>
        <div><NavLink to="my-properties">My Properties</NavLink></div>
        <div><NavLink to="for-rent">For Rent</NavLink></div>
        <div><NavLink to="rented">Rented</NavLink></div>
        <div><NavLink to="for-sale">For Sale</NavLink></div>
        <div><NavLink to="sold">Sold</NavLink></div>
        <div><NavLink to="my-tenants">My Tenants</NavLink></div>
        <div><NavLink to="my-landlords">My Landlords</NavLink></div>
      </div>
      <div>
        <div>
            picture goes here..
        </div>
        <div>
            info goes here..
            <div>
                Name and title goes here
            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
};

export default AgentProfile;
