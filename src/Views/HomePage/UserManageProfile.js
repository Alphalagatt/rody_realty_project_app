import React, { useRef, useState } from "react"
import { Outlet, useLoaderData } from "react-router";
import Nav from "../../Components/Nav";
import { Pie, PieChart, Tooltip } from "recharts";
import axios from "axios";

const UserManageProfile = (props) => {
  const height = 200;
  const width = 200;
  //const {email} = useParams();
  const userDetails = useLoaderData();
  const data = userDetails.data;
  const lease = userDetails.leaseAgreement;
  const property = userDetails.property;
  const rentRef = useRef();
  const emailRef = useRef();
  const givenNameRef = useRef();
  const sirNameRef = useRef();
  const phoneNumberRef = useRef();

  const [pageMgt,setPageMgt] = useState({
    overlay: false,
    id:"",
    editedUser:{

    },
    edit:false
  });

  const editUser = ()=>{
    const editVal = !pageMgt.edit
    setPageMgt((prev)=>{
      return {...prev, 
        edit:editVal,
        editedUser:{
          email:data.email,
          givenName:data.givenName,
          sirName:data.sirName,
          phoneNumber:data.phoneNumber
        }
      }
    });

  };

  const submitChanges = ()=>{
    const user={
      email:emailRef.current.value,
      givenName:givenNameRef.current.value,
      sirName:sirNameRef.current.value,
      phoneNumber:phoneNumberRef.current.value
    };
    axios.put("http://www.localhost:5000/account_management/user_details/edit_user/"+data._id,user).then((err,result)=>{
      if(err){
        console.log(err);
      }else{
        console.log("result: "+result);
      }
    }).catch(err=>{
      console.log("catch: "+err);
    })


    window.location.reload();
  }

  const payRent = ()=>{
    let fullName = data.givenName + " " + data.sirName
    axios.put(`http://www.localhost:5000/lease/pay-rent/${lease._id}/record-id/${pageMgt.id}`,{AmountPaid:rentRef.current.value,PaidBy: fullName}).then((err,result)=>{
      if(err){
        console.log(err);
      }else{
        console.log("result: "+result);
      }
    }).catch(err=>{
      console.log("catch: "+err);
    })
    
    window.location.reload();
  }

  return (
    <div>
      <div className="user-profile-view">
        <div>
            <img src={require("../../RESOURCES/icons8-male-user-100.png")} alt="." />
        </div>
        <div>
            {!pageMgt.edit? <p>{data.email}</p> : <input type="text" ref={emailRef} value={pageMgt.editedUser.email} />}
            {!pageMgt.edit?<p>{data.givenName + " " + data.sirName}</p> : <div><input type="text" ref={givenNameRef} value={pageMgt.editedUser.givenName} /> <input type="text" ref={sirNameRef} value={pageMgt.editedUser.sirName} /></div>}
            {!pageMgt.edit?<p>{data.phoneNumber}</p>:<input type="text" ref={phoneNumberRef} value={pageMgt.editedUser.phoneNumber} />}
        </div>
        <div>
        {!pageMgt.edit? <button onClick={editUser}>Edit User</button> : <button onClick={submitChanges}>Save Changes</button>}<br/>
            <button>Change Password</button>
        </div>
      </div>
      <div>
        {lease&& <div>
            <div>
              <h3>Rented Properties</h3>
              <div className="properties-user-profile-view">
              <div><img className="properties-user-profile-view-image" src={property.results[0].images[0].server+`/${width}x${height}`+property.results[0].images[0].uri} alt="main" />
              </div>
              <div className="properties-admin-view-desc-props-2">
                    <h3>{property.results[0].title}</h3>
                    <p>{property.results[0].address.streetAddress+" "+property.results[0].address.suburb+", "+property.results[0].address.postcode+" "+property.results[0].address.state}</p>
                    <p className="properties-admin-view-desc-props-2-item">
                      <span className="properties-admin-view-desc-props-2-item-span"> <img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/bed.png")} alt="Bedrooms"/> {property.results[0].features.general.bedrooms} </span> 
                      <span className="properties-admin-view-desc-props-2-item-span"><img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/bath.png")} alt="Bathrooms"/> {property.results[0].features.general.bathrooms}</span> 
                      <span className="properties-admin-view-desc-props-2-item-span"><img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/car.png")} alt="Carport"/> {property.results[0].features.general.parkingSpaces}</span>
                      </p>
              </div>
              <div>
                <PieChart width={200} height={200}>
                  <Pie dataKey="value" isAnimationActive={true} data={[{section:"Amount Paid",value:lease.amountToBePaidandDueDateTable.filter(x=>x.Status==="Paid").length},{section:"Amount Not Paid",value:lease.amountToBePaidandDueDateTable.filter(x=>x.Status==="Not Paid").length, fill:"#F78F8F"}]} cx="50%"  cy="50%" outerRadius={80} fill="#004589" label />
                  <Tooltip />
                </PieChart>
              </div>
              </div>
              <div>
                <h4>Lease Details</h4>
                <div>
                  <label>Duration of the lease: </label>{lease.DurationOfAgreementInMonths} Months
                </div>
                <div>
                <table className="table" style={{marginLeft:20}}>
                    <thead>
                    <tr className="table-head">
                        <th>Payment Due Date</th>
                         <th>Amount</th>
                        <th>Amount Paid</th>
                        <th>Date Paid</th>
                        <th>Paid By</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                <tbody className="table-body">
                {lease!==null && lease.amountToBePaidandDueDateTable.map((leaseTable)=>{
                    return (
                        
                    <tr key={leaseTable._id} className="table-row"> 
                        <td>{leaseTable.DueDate}</td>
                        <td>{leaseTable.Amount}</td>
                        <td>{leaseTable.AmountPaid}</td>
                        <td>{leaseTable.DatePaid}</td>
                        <td>{leaseTable.PaidBy}</td>
                        <td>{leaseTable.Status}</td>
                        <td>{leaseTable.Status==="Not Paid" && <button onClick={()=>{return setPageMgt((prev)=>{return {...prev, overlay:true,id:leaseTable._id}})}}>Pay Rent</button>}</td>
                    </tr>)
                })}
            </tbody>
            </table>
                </div>
              </div>
            </div>

            <div>
              <h3>Properties Owned</h3>
            </div>

        </div>}
        <Outlet/>
      </div>

      {pageMgt.overlay&& <div className="properties-admin-view-overlay">
        <div className="properties-admin-view-popup">
          <h3>Pay Rent Here for the selected item</h3>
          <input type="Number" placeholder="$0.00" ref={rentRef}/>
          <button onClick={payRent}>submit</button>
        </div>
                
      </div>}
      
    </div>
  )
};

export default UserManageProfile;


export const UserProfileLoader = async ({params})=>{
    const email = params.email;
    const url = "http://www.localhost:5000/account_management/user_details/get-by-email/"+email;

    
    

    const response  = await fetch(url);
    const findTenantRes = await fetch("http://www.localhost:5000/tenants/by-userid/"+JSON.parse(window.localStorage.getItem("AuthUser"))[0]._id);
    const findTenant = await findTenantRes.json(); 
    if(findTenant!==null){
    const leaseAgreement = await fetch("http://www.localhost:5000/lease/by-tenantid/"+findTenant._id);
    const lease = await leaseAgreement.json();
    const properties_url = 'https://realty-in-au.p.rapidapi.com/properties/detail?id='+lease.propertyLeased;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'cf5f2f69demshe345a94152f5526p1cb350jsnafe27c60cfd3',
		    'X-RapidAPI-Host': 'realty-in-au.p.rapidapi.com'
	    }
    };

    const data = await response.json();

    const property = await fetch(properties_url,options);
    const propertyR = await property.json();
    return {data:data,leaseAgreement:lease,property:propertyR};
  }else{
    const data = await response.json();
    return {data:data}
  }
}