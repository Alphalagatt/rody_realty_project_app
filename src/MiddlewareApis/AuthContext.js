import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function AuthContextProvider(props){

    const [user,setUser] = useState({});
    const [isLoggedIn, SetIsLoggedIn] = useState(false);

    useEffect(()=>{
    if(window.localStorage.getItem("AuthUser")!==null){
        setUser(window.localStorage.getItem("AuthUser"));
    }
    if(window.localStorage.getItem("isLoggedIn")!==null){
        SetIsLoggedIn(window.localStorage.getItem("isLoggedIn"));
    }
},[]);

    const val = {user, setUser,isLoggedIn,SetIsLoggedIn};


    return<AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider;