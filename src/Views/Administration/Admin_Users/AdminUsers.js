import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const AdminUsers = (props) => {
    const [data,setData] = useState(null);
    useEffect(()=>{
    fetch("http://www.localhost:5000/account_management/users").then((result)=>{
        return result.json();   
    }).then(dat=>{
        setData({
            data:dat,
            err:"",
        });
        console.log(JSON.stringify(dat));
    }).catch(err=>{
        setData((prev)=>{
            return {...prev,
                error:err
            }
        })
    })},[]);
    if(data===null){
        return <div className="admin-signup-form-loading"><img src={require("../../../RESOURCES/houseLoading.gif")} alt="loading.."/> </div>
    }
    if(data.err!==""&&data===null){
        return <div>
            There was an error rendering the data, Please try again..
        </div>
    }
    return <div className="admin-body">
        <table className="table" style={{marginLeft:20}}>
            <tr className="table-head">
                <th>User Email Address</th>
                <th>User FullName</th>
                <th>Phone Number</th>
                <th>Account Type</th>
            </tr>
            <tbody className="table-body">
                {data.data.map((user)=>{
                    return (
                        
                    <tr key={user._id} className="table-row"> 
                        <td><Link className="table-row-link" to={user._id}>{user.email}</Link></td>
                        <td><Link className="table-row-link" to={user._id}>{user.givenName+" "+user.sirName}</Link></td>
                        <td><Link className="table-row-link" to={user._id}>{user.phoneNumber}</Link></td>
                        <td><Link className="table-row-link" to={user._id}>{user.accountType}</Link></td>
                    </tr>)
                })}
            </tbody>
        </table>
    </div>
};

export default AdminUsers;
