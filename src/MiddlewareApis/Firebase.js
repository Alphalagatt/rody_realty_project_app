import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


//firebase web sdk for my project
const firebaseConfig = {
    apiKey: "AIzaSyBSnQIePfqCypgn4z4vF-SklNomQ9-KtZ4",
    authDomain: "rodyrealtyproject.firebaseapp.com",
    projectId: "rodyrealtyproject",
    storageBucket: "rodyrealtyproject.appspot.com",
    messagingSenderId: "61839409562",
    appId: "1:61839409562:web:c559b82466fefedec27a23"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export default auth;