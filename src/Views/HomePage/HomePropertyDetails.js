import React, { useRef, useState } from "react"
import { useLoaderData, useParams, Await, defer } from "react-router";
import Nav from "../../Components/Nav";
import axios from "axios";

const HomePropertyDetails = (props) => {

  const height = window.innerHeight-220;
  const width = window.innerWidth* .9;
  const messageRef = useRef();

  //loader data
  const {id} = useParams();
  const myData = useLoaderData();
  const propertyDetails = myData.result;
    console.log(propertyDetails.results[0]);



  const [windowMgt,setWindowMgt] = useState({
    loading:false,
    overlayError:"",
    step:1

  });

  const enquiresClickMove = ()=>{
    setWindowMgt((prev)=>{
      return {...prev,
        step:2
      }
    })
  }

  const addEnquiry = (myEnquiry)=>{
    let message = "";
    switch (myEnquiry) {
      case "requestInspection":
        message = "<h5>Hello Admin</h5> <p> I write this to request the date of inspection for this property.</p> <p>Kind regards</p>";
      break;
      
    case "leaseRequest":
      message = "<h5>Hello Admin</h5> <p> I write this to request for the lease of this property.</p> <p>Kind regards</p>";
      break;

    case "customMessage":
      message = "<h5>Hello Admin</h5> <p>"+messageRef.current.value+"</p> <p>Kind regards</p>";
    break;
  
    
    default:
        break;
    }


    const newEnquiry = {
      enquiryForProperty:id,
      user:JSON.parse(window.localStorage.getItem("AuthUser"))[0]._id,
      CreatedOn: new Date(Date.now()),
      Message:message,
    }

    console.log(newEnquiry);

    axios.post("http://www.localhost:5000/enquiries/new_enquiry",newEnquiry).then((myEnquiry)=>{

      return myEnquiry;
        
    }).then(data=>{
      setWindowMgt((prev)=>{
        return {...prev,
            step:4
          }
      })
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }


  
  return (
    <React.Suspense fallback={<div> <img src={ require("../../RESOURCES/houseLoading.gif")} alt="loading" /> </div>}>
      <Await resolve={propertyDetails} errorElement={<div>Error Loading the data from the server</div>}>
        
        <div>
          <Nav/>
          <div className="properties-admin-view">
              <div><img className="properties-admin-view-image" src={propertyDetails.results[0].images[0].server+`/${width}x${height}`+propertyDetails.results[0].images[0].uri} alt="main" />
              </div>
              <div className="properties-admin-view-desc">
                <div className="properties-admin-view-desc-props">
                  <div className="properties-admin-view-desc-props-1">
                    <div className="properties-admin-view-desc-props-1-item">Photos <span className="">{propertyDetails.results[0].images.filter(item=>item.name==="photo").length}</span></div>
                    <div className="properties-admin-view-desc-props-1-item">Videos <span>{propertyDetails.results[0].images.filter(item=>item.name==="video").length}</span> </div>
                    <div className="properties-admin-view-desc-props-1-item">Floor Plans <span>{propertyDetails.results[0].images.filter(item=>item.name==="floorplan").length}</span> </div>
                    <div className="properties-admin-view-desc-props-1-item">Virtual Tour</div>
                  </div>
                  <div className="properties-admin-view-desc-props-2">
                    <h3>{propertyDetails.results[0].title}</h3>
                    <p>{propertyDetails.results[0].address.streetAddress+" "+propertyDetails.results[0].address.suburb+", "+propertyDetails.results[0].address.postcode+" "+propertyDetails.results[0].address.state}</p>
                    <p className="properties-admin-view-desc-props-2-item">
                      <span className="properties-admin-view-desc-props-2-item-span"> <img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/bed.png")} alt="Bedrooms"/> {propertyDetails.results[0].features.general.bedrooms} </span> 
                      <span className="properties-admin-view-desc-props-2-item-span"><img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/bath.png")} alt="Bathrooms"/> {propertyDetails.results[0].features.general.bathrooms}</span> 
                      <span className="properties-admin-view-desc-props-2-item-span"><img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/car.png")} alt="Carport"/> {propertyDetails.results[0].features.general.parkingSpaces}</span>
                      <span className="properties-admin-view-desc-props-2-item-span"> <img className="properties-admin-view-desc-props-2-img" src={require("../../RESOURCES/Building_blocks.png")} alt="Landsize"/> Property Type </span>
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
                    <p>Unasigned</p>
                    
                  </div>
                  <div className="properties-admin-view-desc-agent-items">
                    <h5>Enquiry</h5>
                    {windowMgt.step === 1 && <button onClick={enquiresClickMove}>Send Enquiries to Admin</button>}
                    {windowMgt.step === 2 && <div>
                      <button onClick={()=>{ return addEnquiry("requestInspection")}}>Request for Inspection</button>
                      <button onClick={()=>{ return addEnquiry("leaseRequest")}}>Request for Lease</button>
                      <button onClick={()=>{return setWindowMgt((prev)=>{return {...prev,step:3}})}}>Write Custom Massage</button>
                    </div>}
                    {windowMgt.step === 3 && <div>
                      <textarea ref={messageRef} placeholder="Add Your message here.."></textarea><br/>
                      <button onClick={()=>{ return addEnquiry("customMessage")}}>Submit</button>
                    </div>}
                    {windowMgt.step === 4 && <div>
                      <p>Message Sent successfully</p>
                      <button onClick={()=>{return setWindowMgt((prev)=>{return {...prev,step:1}})}}>Ok</button>
                    </div>}
                  </div>
                  
                </div>
              </div>
          </div>

        </div>
      </Await>
    </React.Suspense>
  )
};

export default HomePropertyDetails;


export const HomePropertyDetailsLoader = async ({params})=>{
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
  const users = await fetch("http://www.localhost:5000/registration/user_details/User");
  const agents_result = await agents.json();
	const result = await response.json();
  const users_results = await users.json();
  return defer({result: result, agents:agents_result, users:users_results});

} catch (error) {
	console.error(error);
}
}