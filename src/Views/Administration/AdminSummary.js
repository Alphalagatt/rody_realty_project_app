import { type } from "@testing-library/user-event/dist/type";
import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Legend, Bar, Rectangle, PieChart, Pie, ComposedChart } from "recharts";

const AdminSummary = () => {

    const income = [{name:"January",price:43200},{name:"February",price:39300},
    {name:"March",price:27830},
    {name:"April",price:45000},
    {name:"May",price:31500},
    {name:"June",price:30200},
    {name:"July",price:20100},
    {name:"August",price:36400},
    {name:"Sep",price:39300},
    {name:"October",price:26700},
    {name:"Nov",price:42500},
    {name:"Dec",price:34300}]
   


  return (
    <div className="admin-body">
      <div className="admin-summary-container">
        <div className="admin-tile primary">
            <div className="admin-tile-top">
                <div className="admin-tile-top-item">
                    <div className="admin-tile-top-item-number"><h1>5</h1></div>
                    <div  className="admin-tile-top-item-text">Properties</div>
                </div>
                <div className="admin-tile-top-item">
                    <img src={require("../../RESOURCES/Admin-Properties.png")} alt="." />
                </div>
            </div>
            <div className="admin-tile-bottom">
                <div className="admin-tile-bottom-item">24% {true?<img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/> : <img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/>}</div><div  className="admin-tile-bottom-item"></div>
                <div className="admin-tile-bottom-item">This month</div>
            </div>
        </div>


        <div className="admin-tile danger">
            <div className="admin-tile-top">
                <div className="admin-tile-top-item">
                    <div className="admin-tile-top-item-number"><h1>200</h1></div>
                    <div  className="admin-tile-top-item-text">Tenants</div>
                </div>
                <div className="admin-tile-top-item">
                    <img src={require("../../RESOURCES/Admin-Tenants.png")} alt="." />
                </div>
            </div>
            <div className="admin-tile-bottom">
                <div className="admin-tile-bottom-item">2% {false?<img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/> : <img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/>}</div><div  className="admin-tile-bottom-item"></div>
                <div className="admin-tile-bottom-item">This month</div>
            </div>
        </div>

        <div className="admin-tile success">
            <div className="admin-tile-top">
                <div className="admin-tile-top-item">
                    <div className="admin-tile-top-item-number"><h1>7</h1></div>
                    <div  className="admin-tile-top-item-text">Agents</div>
                </div>
                <div className="admin-tile-top-item">
                    <img src={require("../../RESOURCES/AdminAgents.png")} alt="." />
                </div>
            </div>
            <div className="admin-tile-bottom">
                <div className="admin-tile-bottom-item">1% {(1 === 0) ?<img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/> : <img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/>}</div><div  className="admin-tile-bottom-item"></div>
                <div className="admin-tile-bottom-item">This month</div>
            </div>
        </div>

        <div className="admin-tile standard">
            <div className="admin-tile-top">
                <div className="admin-tile-top-item">
                    <div className="admin-tile-top-item-number"><h1>13</h1></div>
                    <div  className="admin-tile-top-item-text">Landlords</div>
                </div>
                <div className="admin-tile-top-item">
                    <img src={require("../../RESOURCES/Admin-Landlords.png")} alt="." />
                </div>
            </div>
            <div className="admin-tile-bottom">
                <div className="admin-tile-bottom-item">8% {(1 === 0) ?<img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/> : <img src={require("../../RESOURCES/icons8-chevron-up-50.png")} alt="."/>}</div><div  className="admin-tile-bottom-item"></div>
                <div className="admin-tile-bottom-item">This month</div>
            </div>
        </div>

      </div>



      <div className="admin-summary-container">
        <div className="admin-summary-chart1">
        <h4 style={{textAlign:"center"}}>Rental Income by Month</h4>
            <LineChart width={800} height={300} data={income} margin={{top:5,right:20,bottom:5,left:0}}>
                <Line type="monotone" dataKey="price" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
            </LineChart>
        </div>

        <div className="admin-summary-chart1">
        <h4 style={{textAlign:"center"}}>Rental Income vs Sales Income</h4>
            <BarChart layout="horizontal" width={400} height={300} data={[{title:"Sales Income",value:2000000},{title:"Rental Income",value:1200000}]} margin={{top:5,right:20,bottom:5,left:0}}>
                <Bar dataKey="value" label={{position:"center"}} fill="#8884d8" width={20} />
                <XAxis dataKey="title"/>
                <YAxis/>
                <Tooltip/>
            </BarChart>
        </div>
      </div>


      <div className="admin-summary-container">
        <div className="admin-summary-chart1 success">
            <div className="admin-summary-container-agent">
                <img src={require("../../RESOURCES/Alpha_Headshot.jpg")} alt="."/>
            </div>
            <div className="admin-summary-container-agent-text-head">
                <h4>Most Performing Agent of The Month</h4>
                <div className="admin-summary-container-agent-text-body">
                    <div className="admin-summary-container-agent-text-body-item">
                        <div><h5>Properties Sold</h5></div>
                        <div><h3>5</h3></div>
                    </div>
                    <div className="admin-summary-container-agent-text-body-item">
                        <div><h5>Rentals Managed</h5></div>
                        <div><h3>10</h3></div>
                    </div>
                </div>
                <div className="admin-summary-container-agent-text-footer">
                    <h4>Total Income</h4>
                    <h1>$6,367,500.00</h1>
                </div>
            </div>
        </div>
        <div className="admin-summary-chart1">
            <h4 style={{textAlign:"center"}}>Number of Rentals vs Selling</h4>
        <PieChart width={350} height={400}>
          <Pie dataKey="value" isAnimationActive={false} data={[{section:"Rental Properties",value:200},{section:"Properties For Sale",value:90}]} cx="50%"  cy="50%" outerRadius={80} fill="#8884d8" label />
          <Pie dataKey="value" data={[{section:"Rental Properties",value:100},{section:"Properties For Sale",value:50}]} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
          <Tooltip />
        </PieChart>
        </div>
        <div className="admin-summary-chart1">
        <h4 style={{textAlign:"center"}}>Number of Listings By Type</h4>
        <ComposedChart layout="vertical" width={400} height={400} data={[{type:"Townhouse",value:10},{type:"Unit",value:50},{type:"Studio",value:30},{type:"Granny Flat",value:25},{type:"Villa",value:4}]} margin={{ top: 20, right: 20, bottom: 20, left: 20, }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="type" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" barSize={20} fill="#413ea0" />
        </ComposedChart>
        </div>
      </div>
    </div>
  )
};

export default AdminSummary;
