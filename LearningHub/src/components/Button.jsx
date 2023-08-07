import React from "react";
import { Navigate } from "react-router-dom";


const Buttonss = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-blue-gradient rounded-[10px] outline-none ${styles}`} onClick={()=>{
    console.log("HI");}}>
    Đăng kí
  </button>
);

export default Buttonss;
