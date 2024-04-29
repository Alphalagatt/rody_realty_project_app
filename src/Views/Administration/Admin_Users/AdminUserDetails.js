import { useLoaderData, useParams } from "react-router";

const AdminUserDetails = (props) => {
    const {id }= useParams();
    const data = useLoaderData();
    return <div className="admin-body">
        <h2>User Details</h2>
        <p>UserName: {data.givenName+ " "+data.sirName}</p>
        <p>Email: {data.email}</p>
        <p>Phone Number: {data.phoneNumber}</p>
        <p>Account Type: {data.accountType}</p>
    </div>
};

export default AdminUserDetails;


export const LoadUser = async({params})=>{
    const {id} = params;
    const res = await fetch("http://www.localhost:5000/registration/user_details/by_id/"+id);
    return res.json();
}