
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link} from "react-router-dom";
//import Signup from "./Views/Authentication_and_authorization/signup";
//import Login from "./Views/Authentication_and_authorization/login";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup">
          welcome
        </Route>
        <Route path="/login">
          login
        </Route>
       
      </Routes>
      
    </Router>   
  );
}

export default App;
