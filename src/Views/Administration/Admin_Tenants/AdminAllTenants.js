import React from "react"
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const AdminAllTenants = (props) => {
    const tenants = useLoaderData();
    console.log("Its working!!");
    console.log(tenants);
  return (
    <div className="admin-body">
        <table className="table" style={{marginLeft:20}}>
            
            <thead className="table-head">
                <th>Property Leased</th>
                <th>User</th>
                <th>CreatedOn</th>
                <th>CreatedBy</th>
            </thead>
            <tbody className="table-body">
                {tenants.map((user)=>{
                    return <Link className="table-row-link" to={user._id}>  <tr key={user._id} className="table-row"> 
                        <td>{user.propertyLeased}</td>
                        <td>{user.user}</td>
                        <td>{user.createdOn}</td>
                        <td>{user.createdBy}</td>
                    </tr></Link>
                })}
            </tbody>
        </table>
    </div>
  )
};

export default AdminAllTenants;


export const adminAllTenantsLoader = async ()=>{

    const response = await fetch("http://www.localhost:5000/tenants");
    const data = await response.json();
    return data;
}