import { google } from "googleapis";
import React, { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { useLoaderData } from "react-router";

const AdminNewProperty = (props) => {
  const [file, setFile] = useState(null);
  const [state, setState] = useState("");
  const [agents,owners] = useLoaderData();
  const arrayofAgents = [];
  const arrayofOwners = [];

  agents.forEach(element => {
    arrayofAgents.push(element.givenName+" "+element.sirName);
  });

  owners.forEach(element => {
    arrayofOwners.push(element.givenName+" "+element.sirName);
  });
  
  const [picker, setPicker] = useState({
    owners_pool: arrayofOwners,
    selected_owners: [],
    searched_owners: [],
    agents_pool: arrayofAgents,
    selected_agents: [],
    searched_agents: [],
    pickedVal: "",
    ownersPickedVal: "",
    forSale: true,
  });


  let pickedItemsArr = picker.selected_agents;
  let agentsPoolArr = picker.agents_pool;

  let ownerPickedItemsArr = picker.selected_owners;
  let ownersPoolArr = picker.owners_pool;

  const address = "";

  let address_ref = useRef();
  let description_ref = useRef();
  let bedrooms_ref = useRef();
  let bathrooms_ref = useRef();
  let carport_ref = useRef();
  let agents_ref = useRef();
  let owner_ref = useRef();

  const property = {
    address: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    carport: "",
    agents: [],
    owners: [],
  };

  function submit_prop() {
    property.address = address_ref.current.value;
    property.description = description_ref.current.value;
    property.bedrooms = bedrooms_ref.current.value;
    property.bathrooms = bathrooms_ref.current.value;
    property.carport = carport_ref.current.value;
    property.agents = [agents_ref.current.value];
    property.owners = [owner_ref.current.value];
  }

  const handlechange = (e) => {
    setFile(e.target.files);
    console.log(file);
  };

  const handleChangeAddress = (address) => {
    setState(address);
  };

  const handleSelectAddress = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        console.log(results[0].formatted_address);
        setState(results[0].formatted_address);
      })
      .catch((error) => console.error("Error", error));
  };

  /*for agents*/
  const searchAgentArray = (e) => {
    let text = e.target.value;
    setPicker((prev) => {
      return {
        ...prev,
        searched_agents: picker.agents_pool.filter((myList) =>
          myList.includes(text)
        ),
        pickedVal: text,
      };
    });
  };

  const addToSelected = (agent) => {
    pickedItemsArr.push(agent);
    agentsPoolArr.splice(agentsPoolArr.indexOf(agent), 1);

    console.log("agent: " + agent + " index: " + agentsPoolArr.indexOf(agent));
    setPicker((prev) => {
      return {
        ...prev,
        agents_pool: agentsPoolArr,
        searched_agents: [],
        pickedVal: "",
        selected_agents: pickedItemsArr,
      };
    });
    console.log(pickedItemsArr);
  };

  const removeToSelected = (agent) => {
    agentsPoolArr.push(agent);
    pickedItemsArr.splice(pickedItemsArr.indexOf(agent), 1);
    console.log("agent: " + agent + " index: " + pickedItemsArr.indexOf(agent));
    setPicker((prev) => {
      return {
        ...prev,
        agents_pool: agentsPoolArr,
        searched_agents: [],
        pickedVal: "",
        selected_agents: pickedItemsArr,
      };
    });
    console.log(pickedItemsArr);
  };

  /*End - For agents*/

  /*for Owners*/
  const searchOwnersArray = (e) => {
    let text = e.target.value;
    setPicker((prev) => {
      return {
        ...prev,
        searched_owners: picker.owners_pool.filter((myList) =>
          myList.includes(text)
        ),
        ownersPickedVal: text,
      };
    });
  };

  const Owners_addToSelected = (owner) => {
    ownerPickedItemsArr.push(owner);
    ownersPoolArr.splice(ownersPoolArr.indexOf(owner), 1);
    setPicker((prev) => {
      return {
        ...prev,
        owners_pool: ownersPoolArr,
        searched_owners: [],
        ownersPickedVal: "",
        selected_owners: ownerPickedItemsArr,
      };
    });
  };

  const Owners_removeToSelected = (owner) => {
    ownersPoolArr.push(owner);
    ownerPickedItemsArr.splice(ownerPickedItemsArr.indexOf(owner), 1);
    setPicker((prev) => {
      return {
        ...prev,
        owners_pool: ownersPoolArr,
        searched_owners: [],
        ownersPickedVal: "",
        selected_owners: ownerPickedItemsArr,
      };
    });
  };

  /*End - For Owners*/

  /*For rent and for sale radios*/
  const toggleForRent = () => {
    setPicker((prev) => {
      return { ...prev, forSale: false };
    });
  };

  const toggleForSale = () => {
    setPicker((prev) => {
      return { ...prev, forSale: true };
    });
  };

  const handleUpload = ([file]) => {
    fetch({
      url: "http://www.localhost:5000/upload/new-upload",
      method: "post",
      body: file,
    }).then((results) => {
      console.log("upload successful" + JSON.stringify(file));
    });
  };

  

  return (
    <div>
      {/*Property management forms*/}
      <div className="admin-body">
        {/*section one*/}
        <div className="admin-new-form">
          <div>
            <div>
              <PlacesAutocomplete
                value={state}
                onChange={handleChangeAddress}
                onSelect={handleSelectAddress}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Address ...",
                        className: "admin-form-address-bar",
                      })}
                    />
                    <div className="admin-form-address-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "admin-form-address-dropdown-active"
                          : "admin-form-address-dropdown";
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
            </div>
            <div className="admin-form-text-area">
              <textarea
                ref={description_ref}
                id="property-description"
                type="textarea"
                rows={8}
                cols={50}
                placeholder="Property Description"
              />
            </div>
          </div>

          <div>
            <div className="form-sub-section-heading">
              <h4>Property Characteristics</h4>
            </div>
            <div className="form-characteristics-container">
              <div className="form-characteristics">
                <label>Bedrooms</label>
                <br />
                <select ref={bedrooms_ref}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
              </div>
              <div className="form-characteristics">
                <label>Bathrooms</label>
                <br />
                <select ref={bathrooms_ref}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
              </div>
              <div className="form-characteristics">
                <label>CarPort</label>
                <br />
                <select ref={carport_ref}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="form-sub-section-heading">
              <h4>Managing Agents</h4>
            </div>
            <div className="form-picker-cont">
              <div className="form-picker">
                <input
                  type="text"
                  onChange={searchAgentArray}
                  value={picker.pickedVal}
                  placeholder="Search Agents.."
                />
                <div className="form-picker-list">
                  {picker.searched_agents.map((agent) => {
                    return (
                      <div
                        className="form-picker-item"
                        onClick={() => {
                          return addToSelected(agent);
                        }}
                      >
                        {agent}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="form-picker-picked-container">
                {picker.selected_agents.map((item) => {
                  return (
                    <div className="form-picker-picked">
                      {item}{" "}
                      <span>
                        <img
                          onClick={() => {
                            return removeToSelected(item);
                          }}
                          src={require("../../../RESOURCES/close.png")}
                          alt="X"
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="form-sub-section-heading">
              <h4>Owners Information</h4>
            </div>
            <div className="form-picker-cont">
              <div className="form-picker">
                <input
                  type="text"
                  onChange={searchOwnersArray}
                  value={picker.ownersPickedVal}
                  placeholder="Search Owners.."
                />
                <div className="form-picker-list">
                  {picker.searched_owners.map((owner) => {
                    return (
                      <div
                        className="form-picker-item"
                        onClick={() => {
                          return Owners_addToSelected(owner);
                        }}
                      >
                        {owner}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="form-picker-picked-container">
                {picker.selected_owners.map((item) => {
                  return (
                    <div className="form-picker-picked-owner">
                      {item}{" "}
                      <span>
                        <img
                          onClick={() => {
                            return Owners_removeToSelected(item);
                          }}
                          src={require("../../../RESOURCES/close.png")}
                          alt="X"
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="form-sub-section-heading">
              <h4>Property Designation</h4>
            </div>
            <div className="form-radio-group">
              <div className="form-radio-group-cont">
                <div
                  className={
                    picker.forSale
                      ? "form-radio-group-item1-selected"
                      : "form-radio-group-item1"
                  }
                  onClick={toggleForSale}
                ></div>
                <div>For Sale</div>
              </div>
              <div hidden={!picker.forSale}>
                Price of The Property:{" "}
                <input
                  id="property-address"
                  type="Number"
                  placeholder="Marked Price.."
                />
              </div>
            </div>
            <div className="form-radio-group">
              <div className="form-radio-group-cont">
                <div
                  className={
                    !picker.forSale
                      ? "form-radio-group-item2-selected"
                      : "form-radio-group-item2"
                  }
                  onClick={toggleForRent}
                ></div>
                <div>For Rent/Lease</div>
              </div>
              <div hidden={picker.forSale}>
                Rent Per Month:{" "}
                <input
                  id="property-address"
                  type="text"
                  placeholder="Marked Price or Rent Per Month"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="form-sub-section-heading">
              <h4>Property Images</h4>
            </div>
            <div className="form-photo-upload-cont">
              <div className="form-photo-upload-drop-window">
                <Dropzone
                  onDrop={handleUpload}
                  accept="image/*"
                  minSize={1024}
                  maxSize={3072000}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  }) => {
                    const additionalClass = isDragAccept
                      ? "accept"
                      : isDragReject
                      ? "reject"
                      : "";
                    return (
                      <div
                        {...getRootProps({
                          className: `dropzone ${additionalClass}`,
                        })}
                      >
                        <input {...getInputProps()} />
                        <img
                          src={require("../../../RESOURCES/cloud_upload.png")}
                          alt="upload"
                        />
                        <p>drag and drop images here</p>
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
              <div>Thumbnails go here</div>
            </div>
          </div>
        </div>
        <input className="admin-form-submit" type="submit" onClick={submit_prop} value="submit" />
      </div>
    </div>
  );
};

export default AdminNewProperty;

async function agentsLoader(){
    const agents = await fetch("http://www.localhost:5000/registration/user_details/Agent");
    return agents.json();
}
async function ownersLoader(){
    const owners = await fetch("http://www.localhost:5000/registration/user_details/Property Owner");
    return owners.json();
}

export const LoadAgents = async () => {
    return Promise.all([agentsLoader(),ownersLoader()]);
}