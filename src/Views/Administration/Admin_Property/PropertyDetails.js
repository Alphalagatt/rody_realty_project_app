import React, { useRef } from "react"
import { useLoaderData, useParams, Await, defer } from "react-router";

const AdminPropertyDetails = (props) => {

  const body_container = useRef();
  const height = window.innerHeight-220;
  const width = window.innerWidth* .9;
    const {id} = useParams();
    const myData = useLoaderData();
    const propertyDetails = myData.result;
    const agentsDetails = myData.agents;
    console.log(agentsDetails);
    console.log(propertyDetails.results[0]);
  return (
    <React.Suspense fallback={<div> <img src={ require("../../../RESOURCES/houseLoading.gif")} alt="loading" /> </div>}>
      <Await resolve={propertyDetails} errorElement={<div>Error Loading the data from the server</div>}>
        <div className="admin-body">
          <div className="properties-admin-view">
              <div><img className="properties-admin-view-image" src={propertyDetails.results[0].images[0].server+`/${width}x${height}`+propertyDetails.results[0].images[0].uri} alt="main Photo" />
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
                      <span className="properties-admin-view-desc-props-2-item-span"> <img className="properties-admin-view-desc-props-2-img" src={require("../../../RESOURCES/Building_blocks.png")} alt="Landsize"/> {propertyDetails.results[0].landSize.displayAppAbbreviated} </span>
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
                    {agentsDetails.map(agent=>{
                      return <div><p><span>{agent.givenName+" "+agent.sirName}</span> <span> {agent.email}</span> </p></div>
                    })}
                    <button>Add Managing Agent</button>
                  </div>
                  <div className="properties-admin-view-desc-agent-items">
                    <h5>Tenants</h5>
                    <div>
                      <button>Add Tenant</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          

          <div className="properties-admin-view-popup">
            
          </div>
          <div className="properties-admin-view-overlay">Overlay</div>
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
  const agents = await fetch("http://www.localhost:5000/registration/user_details/Agent");
  const agents_result = await agents.json();
	const result = await response.json();
  return defer({result: result, agents:agents_result});

} catch (error) {
	console.error(error);
}
}