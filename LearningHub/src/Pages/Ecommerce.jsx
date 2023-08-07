import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoArrowUp } from "react-icons/go";
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../dashboardComponents';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../firebase/config";
import { Loading } from '../components/additionalComponents/Loading';
import Chartt from '../components/Chartt'; 
import { pie_chart_sample } from '../constants';
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const [userData,setUserData] = useState({});
  const [processData, setProcessData] = useState({
    labels: pie_chart_sample.map((data) => data.year),
    datasets: [
      {
        label: "User Grained",
        data: pie_chart_sample.map((data) => data.userGrain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#32cd32",
          "#ffc0cb",
          "rgb(255,102,204)"
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const auth = getAuth();
  const app = initializeApp(firebaseConfig);
  const user = auth.currentUser;
  const db = getFirestore(app);
  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "users", user.uid.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
      setUserData(() => ({ ...docSnap.data() }));
      const emotion = docSnap.data()["emotion"];
      console.log(emotion["angry"]);
      //console.log([...emotion.values()]);
      const array = [emotion["angry"],emotion["disgusted"],emotion["fearful"],emotion["happy"],emotion["neutral"],emotion["sad"],emotion["surprised"]];
      console.log(array);
      const processedData = {
        labels: ["Angry","disgusted","fearful","happy","neutral","sad","surprised"],
        datasets: [
          {
            label: "Minutes",
            data: array,
            backgroundColor: [
              "#FF0000",
              "#ADD8E6",
              "#32cd32",
              "#ffff00",
              "#808080",
              "#800080",
              "#FAFA33",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
        
      }
      setProcessData(processedData);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="mt-24">
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                
              </p>
            </div>
          </div>
            {!userData && !processData ? (<></>):(
              <div className="mt-10 flex gap-10 flex-wrap justify-center">
                <div className=" border-r-1 border-color m-4 pr-10">
                  <div>User feeling status</div>
                  <div className="mt-5">
                    <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
                  </div>
                </div>
                <div>
                  <Chartt plot_data={processData}/>
                  
                </div>
              </div>
              )}
            
          
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
