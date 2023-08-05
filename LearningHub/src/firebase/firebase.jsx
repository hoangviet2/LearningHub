import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./config";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import { Loading } from "../components/additionalComponents/Loading";
import {getFirestore , setDoc, doc} from "firebase/firestore";
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);

export const userAuthContext = createContext();

const createUserFirestore = async (user,email,name) => {
    if (!user) return;
    try{
    //create new document inside 'parking_lots' collection with key [user.uid]
    await setDoc(doc(db, "users", user.uid),{
      email: email,
      doulingoProfile: [],
      name: name,
      badge: 0
    })
  }catch(error){alert(error.message)}
}
export function useUserAuth() {
    return useContext(userAuthContext);
}

function getUID(){
    const user = auth.currentUser;
    console.log();
}

export function UserAuthContextProvider({children}){
    const [user,setUser] = useState(undefined);

    const loginFirebase = async (email,password) => {
        let response;
        if(email !== '' && password !== ''){
            response =  await signInWithEmailAndPassword(auth,email,password)
                .catch((error) => {
                    return {
                        Error_Code : "FIREBASE",
                        Error_Message : error.message
                    }
                });
        }else{
            return {
                Error_code : "INPUT_FORMAT",
                Error_Message : "PLease fill full"
            }
        }
        return response;
    };

    const signUpFirebase = async (email,password,name) => {
        let response;
        if(email !== '' && password !== ''){
            response = await createUserWithEmailAndPassword(auth,email,password)
                .then((userCredentials) => {
                    createUserFirestore(userCredentials.user, email,name);
                })
                .catch(error_=>{
                    return {
                        Error_Code: "FIREBASE",
                        Error_Message: error_.message
                        
                    }
                });
        }else{
            return {
                Error_code : "INPUT_FORMAT",
                Error_Message : "PLease fill full"
            }
        }
        return response;
    };

    const signOutFirebase = async () => {
        let error = await
          signOut(auth)
          .then(()=>console.log("ok"))
          .catch(error_=>{return error_.message});
        return error;
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          setUser(currentuser ? currentuser : null);
        });
        return () => unsubscribe()
    },[])

    return(
        <userAuthContext.Provider
            value={{user, loginFirebase, signUpFirebase, signOutFirebase}}
        >
            { user !== undefined ? children : <Loading/> }
        </userAuthContext.Provider>
    )
}

export const ProtectedRoute = ({children}) => {
    const { user } = useUserAuth();
    if(!user){
      return <Navigate to="/login"/>;
    }else{
      return children;
    }
}

export const UnAuthRoute = ({children}) => {
    const { user } = useUserAuth();
    if(user){
      return <Navigate to="/dashboard"/>;
    }else{
      return children;
    }
}