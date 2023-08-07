import styles from "../style";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
  } from "react-router-dom";
import { Navbar, Footer, Sidebar, ThemeSettings } from '../dashboardComponents';
import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import "../dashBoard/dashboard.css"
import { useStateContext } from "../contexts/ContextProvider"
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../firebase/config";
import { Grid } from "@mui/material";
import { loadModels } from '../face-api/face-api';
import {Header} from "../dashboardComponents";
import ZegoView from "./ZegoCloud";
import {Button} from '../dashboardComponents';
loadModels();
const WaitingRoom = () => {
  const [userData,setUserData] = useState({});
  const auth = getAuth();
  const app = initializeApp(firebaseConfig);
  const user = auth.currentUser;
  const db = getFirestore(app);
  const {activeMenu } = useStateContext();
  useEffect(()  => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const docRef = doc(db, "users", user.uid.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
      setUserData(() => ({ ...docSnap.data() }));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

    const pushing = async (ispush,packages) => {
      //console.log(packages);
      let abc = await fetchData();
      console.log(userData);
      if(ispush){
        //userData["emotion"] = packages;
        console.log(userData);
        //updateFireStoress(userData,user.uid);
      }
    }
    return (
          <div className="flex relative dark:bg-main-dark-bg">
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              {!userData?(
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar userData={"GUESS"}/>
                  </div>
                ):(
                  <div>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                
                      <Navbar userData={userData} />
                    </div>
                    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                      <Header category="Page" title="Learning Rooms" />
                      <div className="flex gap-10 flex-wrap justify-center bg-white rounded-3xl">
                        <div className="mt-6">
                          <Button
                            color="white"
                            bgColor={"blue"}
                            text="Create your own room"
                            borderRadius="10px"
                          />
                        </div>
                      </div>
                    </div>
                    <Outlet />
                    
                  </div>
                )}
              <Footer />
            </div>
          </div>
    )
}

export default WaitingRoom;
