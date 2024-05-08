import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const AdminAllProperties = (props) => {
    const propData = useLoaderData();
  return <div className="admin-body">
    
  <table className="table" style={{marginLeft:20}}>
      <tr className="table-head">
          <th>Property Title</th>
          <th>Address</th>
          <th>Property Type</th>
      </tr>
      <tbody className="table-body">
          {propData.tieredResults[0].results.map((property)=>{
              return  <tr key={property.listingId} className="table-row"> 
                  <td><Link className="table-row-link" to={property.listingId}> {property.title}</Link></td>
                  <td><Link className="table-row-link" to={property.listingId}> {property.address.streetAddress+" "+property.address.suburb+", "+property.address.postcode+" "+property.address.state}</Link></td>
                   <td><Link className="table-row-link" to={property.listingId}> {property.propertyType}</Link></td>
              </tr>
          })}
      </tbody>
  </table>
</div>
};

export default AdminAllProperties;

export const adminPropertiesLoader = async () => {
    const url = 'https://realty-in-au.p.rapidapi.com/properties/list?channel=buy&searchLocation=Sydney&searchLocationSubtext=Region&type=region&page=1&pageSize=30&sortType=relevance&surroundingSuburbs=true&ex-under-contract=false';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cf5f2f69demshe345a94152f5526p1cb350jsnafe27c60cfd3',
            'X-RapidAPI-Host': 'realty-in-au.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};
