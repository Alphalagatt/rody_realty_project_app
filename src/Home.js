import { useAuth } from "./MiddlewareApis/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Components/Nav";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";

function Home(){

    const [state,setState] = useState({
        address:"sydney",
        searchboxToggle:"buy",
        addressForDisplay:"",
        loggedinUser: "",
    });

    const AuthenticateContext = useAuth();

    const handleChangeAddress = address => {
        setState((prev)=>{
            return {...prev,
                address:address,
                addressForDisplay:address
            }
        });
    };

    const handleSelectAddress = address => {
        geocodeByAddress(address)
          .then((results) => {
            console.log(results[0].formatted_address);
            setState((prev)=>{
                return {...prev,
                    address:results[0].formatted_address,
                    addressForDisplay:results[0].formatted_address
                }
            }
        );
        })
          .catch(error => console.error('Error', error));
    };

    

    if(AuthenticateContext.isLoggedIn || window.localStorage.getItem("isLoggedIn")){
        const account = ()=>{
            if(!window.localStorage.getItem("AuthUser")){
                return "";
            }
            
            else{
                
                return JSON.parse(window.localStorage.getItem("AuthUser"))[0].accountType;
            }
        }
        console.log(account);
        switch (account) {
            case "Administrator":
                return <Navigate to="/admin-dashboard/"/>

            case "Agent":
                return <Navigate to="/agent-dashboard/"/>
                
            default:
        }

        
    }
    return <div>
        
        
        <div className="home-section-one">
            <img src={require("./RESOURCES/homepage_cover2.jpg")} alt="homepage background" />
            <div className="home-section-one-search-box">
                <div className="home-section-one-search-box-links">
                    <div onClick={()=>{setState((prev)=>{return {...prev, searchboxToggle:"buy"  } })}} className={state.searchboxToggle==="buy"?"home-section-one-search-box-link-active":"home-section-one-search-box-link"}>Buy</div>
                    <div onClick={()=>{setState((prev)=>{return {...prev, searchboxToggle:"rent"  } })}} className={state.searchboxToggle==="rent"?"home-section-one-search-box-link-active":"home-section-one-search-box-link"}>Rent</div>
                </div>
                <div className="home-section-one-search-box-container">
                    <div className="home-section-one-search-box-container-textbox">

                    <PlacesAutocomplete value={state.addressForDisplay} onChange={handleChangeAddress} onSelect={handleSelectAddress} >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Try a postal code,suburb, or address to find properties', className: 'location-search-input',})} />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                /*const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  */
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      /*style,*/
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>



                        
                        <div className="home-section-one-search-box-container-textbox-filter">
                            <img src={require("./RESOURCES/filter.png")} alt="filter" />
                            Filter
                        </div>
                    </div>
                    <Link className="remove-deco" to={state.searchboxToggle==="buy"?"home-properties/forsale/4/1/"+state.address:"home-properties/forrent/4/1/"+state.address}><div className="home-section-one-search-box-container-button">
                        <img src={require("./RESOURCES/search1.png")} alt="search" />
                        Search
                    </div></Link>

                </div>
                <div className="home-section-one-search-box-recent">
                    <div className="home-section-one-search-box-recent-title">
                        <img src={require("./RESOURCES/recent.png")} alt="recent" />
                        Recent Searches
                    </div>


                </div>
            </div>

            
        </div>


        <div className="home-section-two-forsale">
            <div className="home-section-two-forsale-titles">
                <div id="title1">WHAT'S NEW</div>
                <div id="title2">Our Latest Properties</div>
            </div>
            <div className="home-section-two-forsale-links">
                <div id="link"><NavLink to={"home-properties/forsale/4/1/"+state.address}>Selling</NavLink></div>
                <div id="link"><NavLink to={"home-properties/forrent/4/1/"+state.address}>Renting</NavLink></div>
            </div>
            <Outlet/>

            
        </div>



        <div className="home-section-three-aboutus">
            <div className="home-section-two-forsale-titles">
                <div id="title1">ABOUT US</div>
                <div id="title2">Here is alittle bit about us</div>
            </div>
            
            <div>
                <img src={require("./RESOURCES/Building_blocks.png")} alt="." />
                RODY REALTY Real Estate, a prominent player in the Northern and Western Suburbs, prides
                itself on being an independent and leading real estate agency. Located in South Morang, our
                comprehensive services encompass buying, selling, renting, and leasing commercial and
                residential properties. Our team is renowned for its friendly and professional service, catering
                to buyers, sellers, tenants, and landlords' needs.
                Our success stems from a culture of integrity, professionalism, and growth. We operate as a 
                close-knit family, offering the personalised service of a small company coupled with the
                resources of a larger organisation. Our commitment to continuous learning and market
                awareness sets us apart as industry leaders.
            </div>
            <div>
                <h3>Why It Matters:</h3>
                At RODY REALTY Real Estate, we prioritise integrity, professionalism, and growth. Our ethos 
                revolves around providing exceptional service and fostering long-term relationships with our
                clients.
            </div>
            <div>
                <h3>Key Factors Driving Our Success:</h3>
                The dedicated team at RODY REALTY Real Estate operates on the principles of collaboration
                and mutual support. Rather than competing internally, our executives work together to achieve
                optimal results. Continuous learning and professional development are at the core of our
                philosophy, ensuring that we remain at the forefront of the industry.
            </div>
            <div>
                <h3>Noteworthy Achievements:</h3>
                Despite facing challenges in the real estate market, we are proud to report a remarkable 47%
                increase in sales this year. This achievement reflects our unwavering commitment to excellence
                and customer satisfaction.
            </div>

        </div>



        <div className="home-section-four-footer">
            <div className="home-section-four-footer-contactus">
                <h3>Contact Us</h3>
                <p>Email: lagattalpha@gmail.com</p>
                <p>Phone Number: +610234566705</p>
                <div className="home-section-four-footer-contactus-socials">
                    <h4>Follow Us</h4>
                    <div className="home-section-four-footer-contactus-socials-links">
                        <img src={require("./RESOURCES/facebook_blue.png")} alt="." />
                        <img src={require("./RESOURCES/twitter_blue.png")} alt="." />
                        <img src={require("./RESOURCES/linkedin_blue.png")} alt="." />
                        <img src={require("./RESOURCES/github_blue.png")} alt="." />
                    </div>
                    <h5><Link className="home-section-four-footer-contactus-socials-admin-login" to="/agents-admin-login">Admin/Agent Login</Link></h5>
                </div>
            </div>
            <div className="home-section-four-footer-meet-the-team">
                <div className="home-section-four-footer-meet-the-team-members">
                    <div className="home-section-four-footer-meet-the-team-member">
                        <img src={require("./RESOURCES/Alpha_Headshot.jpg")} alt="." />
                        <h5>Alpha Lagatt</h5>
                        <p>Scram Master</p>
                    </div>
                    <div className="home-section-four-footer-meet-the-team-member">
                        <img src={require("./RESOURCES/James_Headshot.jpg")} alt="." />
                        <h5>James Misoi</h5>
                        <p>Group Leader</p>
                    </div>
                    <div className="home-section-four-footer-meet-the-team-member">
                        <img src={require("./RESOURCES/Hardika_Headshot.jpeg")} alt="." />
                        <h5>Hardika Pareek</h5>
                        <p>Documentation Specialist</p>
                    </div>
                    <div className="home-section-four-footer-meet-the-team-member">
                        <img src={require("./RESOURCES/Gilbert_Headshot.jpeg")} alt="." />
                        <h5>Gilbert Koech</h5>
                        <p>Secretary</p>
                    </div>
                    <div className="home-section-four-footer-meet-the-team-member">
                        <img src={require("./RESOURCES/Ankit_Headshot.jpeg")} alt="." />
                        <h5>Ankit Acharya</h5>
                        <p>Head of Operations</p>
                    </div>
                </div>
                <div className="home-section-four-footer-meet-the-team-footer">
                    This Site is the interlectual property Australian Catholic University - North Sydney MIT 1st Semester Class, Group 2
                    Copyright © 2024. All Rights Reserved.
                </div>

            </div>
        </div>


    </div>
}

export default Home;

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
