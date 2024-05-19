import React from "react"
import { useLoaderData } from "react-router";

const AdminUserEnquiries = (props) => {
    const enquiries = useLoaderData();
  return (
    <div className="admin-body">
      {enquiries.map((enq)=>{
        return<div className="message-box" dangerouslySetInnerHTML={{__html:enq.Message}}/>
      })}
    </div>
  )
};

export default AdminUserEnquiries;


export const AdminEnquiriesLoader = async ()=>{
    const enq = await fetch("http://www.localhost:5000/enquiries");
    const enquiries = await enq.json();

    return enquiries;
}