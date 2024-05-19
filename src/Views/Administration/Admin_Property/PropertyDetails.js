import React from "react"
import { useLoaderData, Await, defer } from "react-router";
import { Link } from "react-router-dom";

const AdminPropertyDetails = (props) => {
  const height = window.innerHeight-220;
  const width = window.innerWidth* .9;

  //loader data
  //const {id} = useParams();
  const myData = useLoaderData();
  const propertyDetails = myData.result;
  const lease = myData.lease;

  console.log(lease);



  
  return (
    <React.Suspense fallback={<div> <img src={ require("../../../RESOURCES/houseLoading.gif")} alt="loading" /> </div>}>
      <Await resolve={propertyDetails} errorElement={<div>Error Loading the data from the server</div>}>
        <div className="admin-body">
          <div className="properties-admin-view">
              <div><img className="properties-admin-view-image" src={propertyDetails.results[0].images[0].server+`/${width}x${height}`+propertyDetails.results[0].images[0].uri} alt="main" />
              </div>
              <div className="properties-admin-view-desc">
                <div className="properties-admin-view-desc-props">
                  <div className="properties-admin-view-desc-props-1">
                    <div className="properties-admin-view-desc-props-1-item">Photos</div>
                    <div className="properties-admin-view-desc-props-1-item">Videos</div>
                    <div className="properties-admin-view-desc-props-1-item">Floor Plans</div>
                    <div className="properties-admin-view-desc-props-1-item">Virtual Tour</div>
                  </div>
                  <div className="properties-admin-view-desc-props-2">
                    <h3>{propertyDetails.results[0].title}</h3>
                    <p>{propertyDetails.results[0].address.streetAddress+" "+propertyDetails.results[0].address.suburb+", "+propertyDetails.results[0].address.postcode+" "+propertyDetails.results[0].address.state}</p>
                    <p className="properties-admin-view-desc-props-2-item">
                      <span className="properties-admin-view-desc-props-2-item-span"> <img className="properties-admin-view-desc-props-2-img" src={require("../../../RESOURCES/bed.png")} alt="Bedrooms"/> {propertyDetails.results[0].features.general.bedrooms} </span> 
                      <span className="properties-admin-view-desc-props-2-item-span"><img className="properties-admin-view-desc-props-2-img" src={require("../../../RESOURCES/bath.png")} alt="Bathrooms"/> {propertyDetails.results[0].features.general.bathrooms}</span> 
                      <span className="properties-admin-view-desc-props-2-item-span"><img className="properties-admin-view-desc-props-2-img" src={require("../../../RESOURCES/car.png")} alt="Carport"/> {propertyDetails.results[0].features.general.parkingSpaces}</span>
                      <span className="properties-admin-view-desc-props-2-item-span"> <img className="properties-admin-view-desc-props-2-img" src={require("../../../RESOURCES/Building_blocks.png")} alt="Landsize"/> Property Type </span>
                      <span className="properties-admin-view-desc-props-2-item-span"> {propertyDetails.results[0].propertyType} </span>
                      </p>
                  </div>
                  <div>
                    <h2>Property Description</h2>
                    <h4>{propertyDetails.results[0].title}</h4>
                    <div dangerouslySetInnerHTML={{__html:propertyDetails.results[0].description}}/>
                  </div>
                </div>
                <div className="properties-admin-view-desc-agent">
                  <div className="properties-admin-view-desc-agent-title">Managing Agent & Tenancy</div>
                  <div className="properties-admin-view-desc-agent-items">
                    <h5>Agents</h5>
                    <ul>
                    {lease!==null && lease.Agent.map(agent=>{return <li>{agent}</li>})}
                    </ul>
                  </div>
                  <div className="properties-admin-view-desc-agent-items">
                    <h5>Tenants</h5>
                    <ul>
                    {lease!== null && lease.Tenants.map(tenant=>{
                      return <li>{tenant}</li>
                    })}
                    </ul>
                  </div>
                  <div className="admin-new-lease">
                  {lease === null && <h6>No lease for this property yet</h6>}
                  {lease === null && <Link to={"/admin-dashboard/tenants/lease-and-tenancy/"+propertyDetails.results[0].listingId} >Generate Rental Agreement & Tenancy</Link>}
                  </div>
                </div>
              </div>
          </div>

        </div>
      </Await>
    </React.Suspense>
  )
};

export default AdminPropertyDetails;


export const propertyDetailsLoader = async ({params})=>{
    const {id} = params;
    const url = 'https://realty-in-au.p.rapidapi.com/properties/detail?id='+id;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cf5f2f69demshe345a94152f5526p1cb350jsnafe27c60cfd3',
		'X-RapidAPI-Host': 'realty-in-au.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
  const leaseAgreement = await fetch("http://www.localhost:5000/lease/by-propertyid/"+id);
	const result = await response.json();
  const lease = await leaseAgreement.json();
  return defer({result: result, lease:lease});

} catch (error) {
	console.error(error);
}
}