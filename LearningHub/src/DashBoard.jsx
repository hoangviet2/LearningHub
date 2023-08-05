import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navbar, Footer, Sidebar, ThemeSettings } from './dashboardComponents';
import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import "./dashBoard/dashboard.css"
import { useStateContext } from "./contexts/ContextProvider"
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import firebaseConfig from "./firebase/config";

const DashBoard = () => {
  
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [userData,setUserData] = useState({});
  const auth = getAuth();
  const app = initializeApp(firebaseConfig);
  const user = auth.currentUser;
  const db = getFirestore(app);
  

  useEffect(()  => {
    fetchData();
      const currentThemeColor = localStorage.getItem('colorMode');
      const currentThemeMode = localStorage.getItem('themeMode');
      if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
      }
    
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

  return(
    <div>
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Settings"
                position="Top"
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>

              </TooltipComponent>
            </div>
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
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                {!userData ?(
                  <Navbar userData={"GUESS"} />
                ):(
                  <Navbar userData={userData} />
                )}
                
              </div>
              <div>
                {themeSettings && (<ThemeSettings />)}
                <Outlet/>
              </div>
              <Footer />
            </div>
          </div>
        </div>
    </div>
  );
}


export default DashBoard;
