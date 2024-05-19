import React from "react"
import { useLoaderData, useParams } from "react-router";
import { Link } from "react-router-dom";

const HomeForRent = (props) => {
    const {pageSize,pageNumber,address} = useParams();
    console.log(pageSize);
    const width = 500;
    const height = 500;
    const ForSaleProperties = useLoaderData();
    console.log(ForSaleProperties.tieredResults[0].results);
  return (
    <>
    <div className="home-section-two-forsale-carousel">
        { ForSaleProperties.tieredResults[0].results.map((property)=>{
                return <div key={property.listingId} className="home-section-two-forsale-carouse-card">
                    
                    <img src={property.images[0].server+`/${width}x${height}`+property.images[0].uri} alt="." />
                    <div className="home-section-two-forsale-carouse-card-info">
                        <div className="home-section-two-forsale-carouse-card-info-sub">{property.address.suburb}</div>
                        <div className="home-section-two-forsale-carouse-card-info-add">{property.address.streetAddress}</div>
                        <div className="home-section-two-forsale-carouse-card-info-prop-cont">
                            <div className="home-section-two-forsale-carouse-card-info-prop">
                                <img src={require("../../RESOURCES/bed.png")} alt="." />
                                <span>{property.features.general.bedrooms}</span>
                            </div>
                            <div className="home-section-two-forsale-carouse-card-info-prop">
                                <img src={require("../../RESOURCES/bath.png")} alt="." />
                                <span>{property.features.general.bathrooms}</span>
                            </div>
                            <div className="home-section-two-forsale-carouse-card-info-prop">
                                <img src={require("../../RESOURCES/car.png")} alt="." />
                                <span>{property.features.general.parkingSpaces}</span>
                            </div>
                        </div>
                        <div className="home-section-two-forsale-carouse-card-info-prop-des">
                            <Link to={"/property-details/"+property.listingId} className="remove-deco"><div className="home-section-two-forsale-footer-btn-1"> View Property</div></Link>
                        </div>
                    </div>
                </div>})}
            </div>

            <div className="home-section-two-forsale-footer">
                { (pageSize === '4') && <Link to={"/home-properties/forrent/12/1/"+address} className="home-section-two-forsale-footer-btn">VIEW ALL FOR RENT</Link>}
                { (pageSize === '12') && <div>
                     <Link to={"/home-properties/forrent/12/1/"+address} className="home-section-two-forsale-footer-btn">1</Link>
                     <Link to={"/home-properties/forrent/12/2/"+address} className="home-section-two-forsale-footer-btn">2</Link>
                     <Link to={"/home-properties/forrent/12/3/"+address} className="home-section-two-forsale-footer-btn">3</Link>
                     <Link to={"/home-properties/forrent/12/4/"+address} className="home-section-two-forsale-footer-btn">4</Link>
                     <Link to={"/home-properties/forrent/12/5/"+address} className="home-section-two-forsale-footer-btn">5</Link>
                </div>}
            </div>
        </>
  )
};

export default HomeForRent;

export const HomePropertiesForRentLoader = async ({params}) => {
    const pagesize = params.pageSize;
    const pageNumber = params.pageNumber;
    const address = params.address;
    const url = 'https://realty-in-au.p.rapidapi.com/properties/list?channel=rent&searchLocation='+address+'&searchLocationSubtext=Region&type=region&page='+pageNumber+'&pageSize='+pagesize+'&sortType=relevance&surroundingSuburbs=true&ex-under-contract=false';
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
