import axios from "axios";
import React, { useRef, useState } from "react"
import { useLoaderData, useParams } from "react-router";
import { Link } from "react-router-dom";

const AdminNewLeaseAndTenancy = (props) => {
    const {propertyId} = useParams();
    const {tenants,users,agents} = useLoaderData();
    const durationRef = useRef();
    const frequencyRef = useRef("");
    const startDateRef = useRef();
    const endDateRef = useRef();
    const amountRef = useRef();
    const arrayOfpayments = [];


    const [pageMgt,setPageMgt] = useState({
        page:1,
        existing:false,
        savedTenant:{},
        tenant:{
            propertyID:propertyId,
            userID:"",
            createdOn:Date.now(),
            loggedInuserID:JSON.parse(localStorage.getItem("AuthUser"))[0]._id,
        },
        rentalAgreement: {
            propertyID:propertyId,
            TenantID:"",
            AgentID:"",
            DurationOfAgreementInMonths:0,
            paymentFrequency:0,
            amountToBePaidandDueDateTable:[{}],
        },
        
    });

    const step1 = (val)=>{
        if(val==="new"){
            setPageMgt((prev)=>{
                return {...prev,
                    page:2,
                    existing:false,
                }
            })
        }else if(val==="existing"){
            setPageMgt((prev)=>{
                return {...prev,
                    page:2,
                    existing:true,
                }
            })
        }
        
    }
    const toggleNew = ()=>{
        const ex = pageMgt.existing;
        setPageMgt((prev)=>{
            return {...prev,
                existing:!ex,
            }
        })
    }

    const pickSelectedUser = (id)=>{
        setPageMgt((prev)=>{
            return {...prev,
                tenant:{
                    propertyID:propertyId,
                    userID:id,
                    createdOn:Date.now(),
                    loggedInuserID:JSON.parse(localStorage.getItem("AuthUser"))[0]._id
                }
            }
        });
        console.log(pageMgt.tenant);
    }

    const pickSelectedTenant = (id)=>{
        setPageMgt((prev)=>{
            return {...prev,
                tenant:{
                    propertyID:propertyId,
                    userID:id,
                    createdOn: Date.now(),
                    CreatedBy:JSON.parse(localStorage.getItem("AuthUser"))[0]._id
                }
            }
        });
        console.log(pageMgt.tenant);
        
    }
    const pickSelectedAgent = (id)=>{
        const tenantID = pageMgt.savedTenant._id;
        setPageMgt((prev)=>{
            return {...prev,
                rentalAgreement:{
                    propertyID:propertyId,
                    AgentID:id,
                    TenantID:tenantID,

                }
            }
        })
        console.log(pageMgt.savedTenant);
    }
    const useAgent = ()=>{
        setPageMgt((prev)=>{
            return {...prev,
                page:4,
            }
        });
    }

    //format date..
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    //calculate duration
    const calcDuration = ()=>{
        const startDate = new Date(Date.parse(startDateRef.current.value));
        const duration = Number(durationRef.current.value);
        const endDate = startDate.setMonth(startDate.getMonth()+ duration);
        endDateRef.current.value = formatDate(new Date(endDate));
        console.log(new Date(Date.parse(startDateRef.current.value)));
    }

    const generatePaymentsTable = ()=>{
        let NumberOfPayments = 0;
        let daysDiff = new Date(endDateRef.current.value).getTime() - new Date(startDateRef.current.value).getTime();
        let daysDiffR = Math.round(daysDiff/(1000*3600*24));
        switch (frequencyRef.current.value) {
            case "FortNightly":
                console.log(daysDiffR);
                NumberOfPayments = Math.round(daysDiffR/14);
                for(var i = 0;i<NumberOfPayments;i++){
                    let payment = {
                        DueDate:formatDate(new Date(new Date(startDateRef.current.value).setDate(new Date(startDateRef.current.value).getDate()+(14*i)))),
                        Amount:amountRef.current.value,
                        AmountPaid:0,
                        DatePaid:"",
                        PaidBy:"",
                        Status:"Not Paid"
                    }
                    arrayOfpayments.push(payment);
                    
                };
                setPageMgt((prev)=>{
                    return {...prev,
                        rentalAgreement:{
                            amountToBePaidandDueDateTable:arrayOfpayments,
                        }
                    }
                });
                
                break;
        
            case "Weekly":
                NumberOfPayments = Math.round(daysDiffR/7)
                for(var j = 0;j<NumberOfPayments;j++){
                    let period = 7*j;
                    let payment = {
                        DueDate:formatDate(new Date(new Date(startDateRef.current.value).setDate(new Date(startDateRef.current.value).getDate()+period))),
                        Amount:amountRef.current.value,
                        AmountPaid:0,
                        DatePaid:"",
                        PaidBy:"",
                        Status:"Not Paid"
                    }
                    arrayOfpayments.push(payment);
                }

                setPageMgt((prev)=>{
                    return {...prev,
                        rentalAgreement:{
                            amountToBePaidandDueDateTable:arrayOfpayments,
                        }
                    }
                });

                break;

            case "Monthly":
                NumberOfPayments = durationRef.current.value;
                for(var k=0;k<=NumberOfPayments;k++){
                    let payment = {
                        DueDate:formatDate(new Date(new Date(startDateRef.current.value).setMonth(new Date(startDateRef.current.value).getMonth()+k))),
                        Amount:amountRef.current.value,
                        AmountPaid:0,
                        DatePaid:"",
                        PaidBy:"",
                        Status:"Not Paid"
                    }
                    arrayOfpayments.push(payment);
                }

                const arrayTenant = [];
                const arrayAgent =[];
                arrayTenant.push(pageMgt.rentalAgreement.TenantID);
                arrayAgent.push(pageMgt.rentalAgreement.AgentID);
                const myPropertyID = pageMgt.rentalAgreement.propertyID;
                
                const myPaymentFrequency = frequencyRef.current.value;

                setPageMgt((prev)=>{
                    return {...prev,
                        rentalAgreementToBeSaved:{
                            propertyID:myPropertyID,
                            TenantID:arrayTenant,
                            AgentID:arrayAgent,
                            DurationOfAgreementInMonths:durationRef.current.value,
                            paymentFrequency: myPaymentFrequency,
                            amountToBePaidandDueDateTable:arrayOfpayments,

                        },
                        rentalAgreement:{
                            amountToBePaidandDueDateTable:arrayOfpayments,
                        }
                    }
                });

                

                break;
        
            default:
                break;
        }


    }

    const SaveLeaseAgreement = ()=>{
        
        console.log(pageMgt.rentalAgreementToBeSaved);

        axios.post("http://www.localhost:5000/lease/new-agreement",pageMgt.rentalAgreementToBeSaved).then((myAgreement)=>{

       return myAgreement;
        
       }).then(data=>{
        setPageMgt((prev)=>{
            return {...prev,
                savedAgreement:data.data.Result,
                page:5
            }
        });
        console.log(pageMgt.savedAgreement);
       }).catch((err)=>{
        console.log(err);
       })
    }

    const createTenant = ()=>{
       axios.post("http://www.localhost:5000/tenants/new-tenant",pageMgt.tenant).then((myTenant)=>{

       return myTenant;
        
       }).then(data=>{
        setPageMgt((prev)=>{
            return {...prev,
                savedTenant:data.data.Result,
                page:3
            }
        });
        console.log(pageMgt.savedTenant);
       }).catch((err)=>{
        console.log(err);
       })

        
        
    }
  return (
    <div className="admin-body">
        {pageMgt.page === 1 && <div className="agreement-subpage">
            <h1>Lease and Tenancy Agreements</h1>
            <h3>Create tenancy and rentanl agreements. Start below</h3>

            <button onClick={()=>{ return step1("existing")}}>Create from Existing Tenant</button>
            <button onClick={()=>{return step1("new")}}>Create a New Tenant</button>
        </div>}
        {pageMgt.page === 2 && <div className="agreement-subpage">
            {pageMgt.existing && <div>
                <h1>Pick an existing Tenant</h1>
                <table className="table" style={{marginLeft:20}}>
                    <thead>
                    <tr className="table-head">
                        <th>property Leased</th>
                         <th>User ID</th>
                        <th>Created On</th>
                        <th>Created By</th>
                    </tr>
                    </thead>
                <tbody className="table-body">
                {tenants.map((user)=>{
                    return (
                        
                    <tr onClick={()=>{return pickSelectedTenant(user.user)}} key={user._id} className="table-row"> 
                        <td>{user.propertyLeased}</td>
                        <td>{user.user}</td>
                        <td>{user.createdOn}</td>
                        <td>{user.CreatedBy}</td>
                    </tr>)
                })}
            </tbody>
        </table>
                <button onClick={toggleNew}>Start from new</button>
                </div>}
            {!pageMgt.existing && <div>
                <h1>Create new Tenant</h1>
                <h3>You can only create a tenant from the list of registered users. If your user does not exist you will have to register them then come back to continue the process.</h3>
                <div>
                    <label>{pageMgt.tenant.userID}</label> <button onClick={createTenant}>Create Tenant</button>
                </div>
                <table className="table" style={{marginLeft:20}}>
                    <thead>
                    <tr className="table-head">
                        <th>User Email Address</th>
                         <th>User FullName</th>
                        <th>Phone Number</th>
                        <th>Account Type</th>
                    </tr>
                    </thead>
                <tbody className="table-body">
                {users.map((user)=>{
                    return (
                        
                    <tr onClick={()=>{return pickSelectedUser(user._id)}} key={user._id} className="table-row"> 
                        <td>{user.email}</td>
                        <td>{user.givenName+" "+user.sirName}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.accountType}</td>
                    </tr>)
                })}
            </tbody>
        </table>
                <button onClick={toggleNew}>use Existing</button>
                </div>}
        </div>}
        {pageMgt.page === 3 && <div  className="agreement-subpage">
            <h1>Lease and Tenancy Agreements</h1>
            <h3>Pick an Agent</h3>
            <div>
                <label>{pageMgt.rentalAgreement.AgentID}</label> <button onClick={useAgent}>Use Agent</button>
            </div>
            <table className="table" style={{marginLeft:20}}>
                    <thead>
                    <tr className="table-head">
                        <th>User Email Address</th>
                         <th>User FullName</th>
                        <th>Phone Number</th>
                        <th>Account Type</th>
                    </tr>
                    </thead>
                <tbody className="table-body">
                {agents.map((user)=>{
                    return (
                        
                    <tr onClick={()=>{return pickSelectedAgent(user._id)}} key={user._id} className="table-row"> 
                        <td>{user.email}</td>
                        <td>{user.givenName+" "+user.sirName}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.accountType}</td>
                    </tr>)
                })}
            </tbody>
        </table>

        </div>}
        {pageMgt.page === 4 && <div  className="agreement-subpage">
           <div>
            <div><input type="text" value={pageMgt.rentalAgreement.propertyID} disabled={true}/></div>
            <div><input type="text" value={pageMgt.rentalAgreement.TenantID} disabled={true}/></div>
            <div><input type="text" value={pageMgt.rentalAgreement.AgentID} disabled={true}/></div>
            <div><h4>Payments Table</h4></div>
            <div className="select-props-lease">
            <div>
                <label>Start Date:</label>
                <input type="date" ref={startDateRef} />
            </div>
            <div>
                <label>Duration</label>
                <select ref={durationRef} onChange={calcDuration} >
                    <option>6</option>
                    <option>12</option>
                    <option>18</option>
                    <option>24</option>
                    <option>36</option>
                </select>
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" ref={endDateRef} disabled={true} />
            </div>
            <div>
                <label>Repayment Frequency</label>
                <select ref={frequencyRef} >
                    <option>Weekly</option>
                    <option>FortNightly</option>
                    <option>Monthly</option>
                </select>
            </div>
            
            <div>
                <label>Rent Per {frequencyRef.current.value}: </label>
                <input type="number" ref={amountRef} placeholder="$0.00"/>
            </div>

            <div>
                <button onClick={generatePaymentsTable}>Generate Lease Payment table</button>
            </div>

            </div>
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
                    </tr>
                    </thead>
                <tbody className="table-body">
                {pageMgt.rentalAgreement.amountToBePaidandDueDateTable? pageMgt.rentalAgreement.amountToBePaidandDueDateTable.map((user)=>{
                    return (
                        
                    <tr onClick={()=>{return pickSelectedAgent(user._id)}} key={user._id} className="table-row"> 
                        <td>{user.DueDate}</td>
                        <td>{user.Amount}</td>
                        <td>{user.AmountPaid}</td>
                        <td>{user.DatePaid}</td>
                        <td>{user.PaidBy}</td>
                        <div>{user.Status}</div>
                    </tr>)
                }):""}
            </tbody>
            </table>
           </div>
           <div>
            <button onClick={SaveLeaseAgreement}>Save Lease Agreement</button>
           </div>

        </div>}

        {pageMgt.page === 5 && <div className="agreement-subpage">
        <h1>Lease and Tenancy Agreements</h1>
        <h3>Lease Created Successfully</h3>
        <div className="admin-new-lease">
        <Link to={"/admin-dashboard/properties/"+propertyId} >Save Lease Agreement</Link>
        </div>
        </div>}
      
    </div>
  )
};

export default AdminNewLeaseAndTenancy;

export const AdminNewLeaseAndTenancyLoader = async ()=>{
    const responseTenants = await fetch("http://www.localhost:5000/tenants");
    const responseUsers = await fetch("http://www.localhost:5000/registration/user_details/User");
    const responseAgents= await fetch("http://www.localhost:5000/registration/user_details/Agent");

    const users = await responseUsers.json();
    const tenants = await responseTenants.json();
    const agents = await responseAgents.json();

    const data = await {
        tenants:tenants,
        users:users,
        agents:agents,
    }

    return data;

}



