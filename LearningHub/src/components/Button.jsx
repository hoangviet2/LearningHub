import React, { useState } from "react";
import { Navigate } from "react-router-dom";



const Buttonss = ({ styles }) => {
  const [navigate,isnavigate] = useState(false);

  return(
    <>
    {navigate?(<Navigate to={"/dashboard"}/>):(
      <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-blue-gradient rounded-[10px] outline-none ${styles}`} onClick={()=>{isnavigate(true)}}>
        Đăng kí
      </button>
    )}
    </>
  );
}

export default Buttonss;
