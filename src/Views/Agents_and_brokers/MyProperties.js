import { useState } from "react";

function MyProperties() {
    const [data,setData] = useState(null);
    fetch("http://www.localhost:5000/property").then((result)=>{
        return result.json();
    }).then(dat=>{
        setData({
            data:dat,
            err:"",
        });
    }).catch(err=>{
        setData((prev)=>{
            return {...prev,
                error:err
            }
        })
    })
    if(data===null){
        return <div>
            loading..
        </div>
    }
    if(data.err!==""&&data===null){
        return <div>
            There was an error rendering the data, Please try again..
        </div>
    }
    return <div>
        <table className="table">
            
            <thead className="table-head">
                <th>Property Address</th>
                <th>Property Characteristics</th>
                <th>Managing Agents</th>
                <th>Owners</th>
                <th>Property Designation</th>
            </thead>
            <tbody className="table-body">
                {data.data.map((property)=>{
                    return <tr key={property._id} className="table-row">
                        <td>{property.propertyAddress}</td>
                        <td>
                            <div className="property-properties">
                                <div>
                                    <img src={require("../../RESOURCES/bed.png")} alt="bedrooms"/>
                                    <div>{property.bedRooms}</div>
                                </div>
                                <div>
                                    <img src={require("../../RESOURCES/bath.png")} alt="bedrooms"/>
                                    <div>{property.bathrooms}</div>
                                </div>
                                <div>
                                    <img src={require("../../RESOURCES/car.png")} alt="bedrooms"/>
                                    <div>{property.carPort}</div>
                                </div>
                            </div>
                        </td>
                        <td>{property.managingAgents.length===0?"Managing Agents Not assigned yet.":property.managingAgents[0]+"...+"+property.managingAgents.length-1}</td>
                        <td>{property.Owners.length===0?"Owners Agents Not assigned yet.":property.Owners[0]+"...+"+property.Owners.length-1}</td>
                        <td>{property.propertyDesignation}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default MyProperties;