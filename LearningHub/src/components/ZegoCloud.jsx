
import { APP_ID,SEVER_SECRETE } from "../constants/constants";
import React, { useEffect, useState, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Navigate } from "react-router-dom";
import Webcam from "react-webcam";
import Camera from "./Camera";
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
    const hiding = useRef(null);
    const [leaving,setLeaving] = useState(false);
    let myMeeting = async (element) => {
     // generate Kit Token
    const appID = APP_ID;
    const serverSecret = SEVER_SECRETE;
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
    
     // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
    zp.joinRoom({
        container: element,
        onLeaveRoom:() =>{
            console.log("HI");
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
        <>
            {leaving?(<Navigate to={"/dashboard"}/>):(
                <>
                    {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" ref={myMeeting}></div> */}
                    <Webcam muted={false} ref={hiding} style={{height:0}} />
                </>
            )}
        </>
    )
}
export default ZegoView;