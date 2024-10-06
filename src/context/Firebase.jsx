// import { create } from "@mui/material/styles/createTransitions";
import { createContext, useContext } from "react";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCZjGQb8lWxKdPf94ipmk-xleQbuSAe-xU",
  authDomain: "scrollme-40ba6.firebaseapp.com",
  projectId: "scrollme-40ba6",
  storageBucket: "scrollme-40ba6.appspot.com",
  messagingSenderId: "748771881750",
  appId: "1:748771881750:web:2cb97bb2c7b7468a7c1637"
     
};
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider =(props) =>{
    
  
    return(

        <FirebaseContext.Provider>
            {props.children}
        </FirebaseContext.Provider>
    )
}
