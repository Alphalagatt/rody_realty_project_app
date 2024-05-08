import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "./Views/Authentication_and_authorization/login";
import Signup from "./Views/Authentication_and_authorization/signup";
//import Nav from "./Components/Nav";
import AccountManagementPage from "./Views/Authentication_and_authorization/account_management_page";
import ForgetPassword from "./Views/Authentication_and_authorization/forget_password";
import "../src/index.css"
import SigninBackground from "./Components/SigninBackground";
import UserDashboard from "./Views/Users/UserDashboard";
import Home from "./Home";
import VerifyEmail from "./Views/Authentication_and_authorization/VerifyEmail";
import AgentDashboard from "./Views/Agents_and_brokers/AgentDashboard";
import AgentsPropertiesPage from "./Views/Agents_and_brokers/AgentsPropertiesPage";
import Reports from "./Views/Agents_and_brokers/Reports";
import AgentsTenantsPage from "./Views/Agents_and_brokers/AgentsTenantsPage";
import AgentsLeadsPage from "./Views/Agents_and_brokers/AgentsLeadsPage";
import AgentsLandlordsPage from "./Views/Agents_and_brokers/AgentsLandlordsPage";
import NewProperty from "./Views/Agents_and_brokers/NewProperty";
import MyProperties from "./Views/Agents_and_brokers/MyProperties";
import AgentsPropertyDetailsPage from "./Views/Agents_and_brokers/AgentsPropertyDetailsPage";
import NewLandlord from "./Views/Agents_and_brokers/NewLandlord";
import NewTenant from "./Views/Agents_and_brokers/NewTenant";
import AllTenants from "./Views/Agents_and_brokers/AllTenants";
import AgentsandAdminsLogin from "./Views/Administration/Agents_And_Admins_Auth/AgentsandAdminsLogin";
import RegisterAdminsAndAgents from "./Views/Administration/Agents_And_Admins_Auth/RegisterAdminsAndAgents";
import Nav from "./Components/Nav";
import AdminDashboard from "./Views/Administration/AdminDashboard";
import AdminSummary from "./Views/Administration/AdminSummary";
import AdminManageProfile from "./Views/Administration/AdminManageProfile";
import AdminAgentsPage from "./Views/Administration/Admin_Agents/AdminAgentsPage";
import AgentsSummary from "./Views/Administration/Admin_Agents/AgentsSummary";
import AgentProfile from "./Views/Administration/Admin_Agents/AgentProfile";
import ForRent from "./Views/Administration/Admin_Agents/ForRent";
import Rented from "./Views/Administration/Admin_Agents/Rented";
import ForSale from "./Views/Administration/Admin_Agents/ForSale";
import Sold from "./Views/Administration/Admin_Agents/Sold";
import MyTenants from "./Views/Administration/Admin_Agents/MyTenants";
import MyLandlords from "./Views/Administration/Admin_Agents/MyLandlords";
import AdminMyProperties from "./Views/Administration/Admin_Agents/AdminMyProperties";
import AdminUsers from "./Views/Administration/Admin_Users/AdminUsers";
import AdminUserDetails, { LoadUser } from "./Views/Administration/Admin_Users/AdminUserDetails";
import AdminNewProperty, { LoadAgents } from "./Views/Administration/Admin_Property/AdminNewProperty";
import AdminAllProperties, { adminPropertiesLoader } from "./Views/Administration/Admin_Property/AdminAllProperties";
import AdminPropertyDetails, { propertyDetailsLoader } from "./Views/Administration/Admin_Property/PropertyDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>}/>
      <Route path="/authentication">
        <Route path="/authentication/signup" element={<><Signup/><SigninBackground/></>} />
        <Route path="/authentication/login" element={<><Login/><SigninBackground/></>} />
        <Route path="/authentication/verify_email" element={<><VerifyEmail/><SigninBackground/></>} />
        <Route path="/authentication/forget_password" element={<><ForgetPassword/><SigninBackground/></>}/>
        <Route path="/authentication/account_management_page" element={<AccountManagementPage/>}/>
      </Route>

      <Route path="agents-admin-login">
        <Route index element={<AgentsandAdminsLogin/>}/>
      </Route>

      <Route path="admin-dashboard" element={<AdminDashboard/>}>
        <Route index element={<AdminSummary/>}/>
        <Route path="properties" element={<AdminDashboard/>}>
          <Route index loader={adminPropertiesLoader} element={<AdminAllProperties/>}/>
          <Route path=":id" loader={propertyDetailsLoader} element={<AdminPropertyDetails/>}/>
          <Route path="new-property" loader={LoadAgents} element={<AdminNewProperty/>}/> 
        </Route>
        <Route path="manage-profile" element={<AdminManageProfile/>}/>
        <Route path="agents" element={<AdminAgentsPage/>}>
          <Route index element={<AgentsSummary/>}/>
          <Route path="agent-profile/:id" element={<AgentProfile/>}>
            <Route path="my-properties" element={<AdminMyProperties/>}/>
            <Route path="for-rent" element={<ForRent/>} />
            <Route path="rented" element={<Rented/>}/>
            <Route path="for-sale" element={<ForSale/>}/>
            <Route path="sold" element={<Sold/>}/>
            <Route path="my-tenants" element={<MyTenants/>}/>
            <Route path="my-landlords" element={<MyLandlords/>}/>
          </Route>
        </Route>
        <Route path="users">
          <Route path="new-user" element={<RegisterAdminsAndAgents/>} />
          <Route index element={<AdminUsers/>}/>
          <Route path=":id" element={<AdminUserDetails/>} loader={LoadUser}/>
        </Route>
      </Route>

      <Route path="/user-dashboard">
        <Route path="/user-dashboard/" element={<UserDashboard/>}/>
      </Route>


      <Route path="agent-dashboard" element={<AgentDashboard />}>
        <Route index element={<Reports/>}/>
        <Route path="properties" element={<AgentsPropertiesPage/>}>
          <Route path="new-properties" element={<NewProperty/>}/>
          <Route path="my-properties" element={<MyProperties/>}>
            <Route path=":id" element={<AgentsPropertyDetailsPage/>}/>
          </Route>
        </Route>
        <Route path="landlords" element={<AgentsLandlordsPage/>}>
          <Route path="find-landlord" element={<NewLandlord/>}/>
        </Route>
        <Route path="tenants" element={<AgentsTenantsPage/>}>
          <Route path="find-tenant" element={<NewTenant/>}/>
          <Route path="all-tenants" element={<AllTenants/>}/>
        </Route>
        <Route path="leads" element={<AgentsLeadsPage/>}/>

      </Route>


    </Route>
  ))
  return (
    <div className="main-body">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
