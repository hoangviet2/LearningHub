
import { APP_ID,SEVER_SECRETE } from "../constants/constants";
import React, { useEffect, useState, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Navigate } from "react-router-dom";
import Webcam from "react-webcam";
import Camera from "./Camera";
import { detectFaces } from "../face-api/face-api";
import { Loading } from "./additionalComponents/Loading";
import { useUserAuth } from "../firebase/firebase";
import { height } from "@mui/system";
import { updateFireStoress } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import firebaseConfig from "../firebase/config";

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}


const ZegoView = () => {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const [userData,setUserData] = useState({});
    const [leaving,setLeaving] = useState(false);
    const auth = getAuth();
    const app = initializeApp(firebaseConfig);
    const user = auth.currentUser;
    const db = getFirestore(app);
    // Camera section
    const [result,setResult] =  useState({
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprised: 0,
    });
    const camera = useRef();

    //Camera function
    const getFaces = async () => {
      if (camera.current !== null) {
        let faces = null;
        faces = await detectFaces(camera.current.video);
        if(faces!== null){
          console.log(faces);
          setResult(faces);
          let emoji = faces.map((data) => data.expressions.asSortedArray()[0].expression);
          if(result[emoji[0]] !== undefined){
            result[emoji[0]] += 1;
            setResult(result);
            console.log(result);
          }
        }
        
      }
    };
    
    useEffect(() => {
      if (camera !== null) {
        const ticking = setInterval(async () => {
          await getFaces();
        }, 5000);
        return () => {
          clearInterval(ticking);
        };
  
      }
    }, []);

    const update = async () => {
      const Reff = doc(db, "users", user.uid.toString());
      let abc = await updateDoc(Reff, {
        emotion: result
      });
      if(abc!== undefined){
        setLeaving(true);
      }
      
    }

    let myMeeting = async (element) => {
     // generate Kit Token
    const appID = APP_ID;
    const serverSecret = SEVER_SECRETE;
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
    
     // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    


    zp.joinRoom({
        container: element,
        onLeaveRoom: () => {
          update();
          setLeaving(true);
        },
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    }

    return(
        
        <div>
          {leaving?(<Navigate to={"/dashboard"}/>):
          (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" ref={myMeeting}></div>
          )}
          {!userData?(<></>):(
            <Webcam audio={false} ref={camera} style={{height:1}} />
          )}
        </div>
    )
}
export default ZegoView;