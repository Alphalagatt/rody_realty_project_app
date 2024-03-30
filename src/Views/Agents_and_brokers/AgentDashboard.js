import { Link } from "react-router-dom";
import AgentsSideNav from "../../Components/AgentsSideNav";
import EnquiriesComponent from "../../Components/EnquiriesComponent";

function AgentDashboard() {

    return <div className="agent-dashboard">
        <AgentsSideNav/>
        <div className="agent-dashboard-body">
        <div className="Top-nav" style={{position:"relative",justifyContent:"right",width:"70vw",marginTop:20,paddingTop:0}}>
            <div className="nav-links">
                <Link className="nav-link" to="/">Find a property</Link>
                <Link className="nav-link" to="/">Our Team</Link>
                <Link className="nav-link" to="/">For Owners</Link>
                <Link className="nav-link" to="/">About Us</Link>

                <img src={require("../../RESOURCES/Alpha_Headshot.jpg")} alt="." style={{width:30,borderRadius:20}} />
            </div>
        </div>
        
        <div>
            <h2>Property Management</h2>
        </div>
        <div className="agent-dashboard-management-forms">
        {/*Property management forms*/}
        <div className="agent-dashboard-management-forms-top-nav">
            <div>My Properties</div>
            <div>My Recently added Properties</div>
            <div id="add-property">Add New Property</div>
        </div>
        <div>
            {/*section one*/}
            <div>
                <input type="text" placeholder="Property Address" />
            </div>
            <div>
                <textarea type="textarea" rows={8} cols={50} placeholder="Property Description" />
            </div>

            <div>
                <div>Property Characteristics</div>
                <div>
                    <div>
                        <label>Bedrooms</label>
                        <input type="Number" placeholder="Bedrooms"/>
                    </div>
                    <div>
                        <label>Bathrooms</label>
                        <input type="Number" placeholder="Bathrooms"/>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <EnquiriesComponent/>
        </div>
    </div>
}

export default AgentDashboard;