import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from "react"
import "./login/Login.css"
import TextField from '@mui/material/TextField';
import Loginstyles from "./login/Loginstyle";
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../firebase/firebase";
import { Loading } from "./additionalComponents/Loading";
import { useState , useRef } from "react";
export default function Login(){
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef(null);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [signup,setSignup] = useState(false);
  const {loginFirebase} = useUserAuth();
  const [loading,setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = e => {
    setEmail(e.target.value);
  };

  async function test(){
    setLoading(true);
    let response = await loginFirebase(email,password);
    console.log(response);
    if(response !== ""){
      setLoading(false);
      alert("Welcome");
    }else{
      alert(response["Error_Message"]);
    }
  }
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const naviagetes = () => {
    setSignup(true);
  };

  return(
    <div>
      {loading ? (
        <Loading />
      ):(
        <div className="Auth-form-container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="underline">
              <a href="/signup">Sign Up</a>
            </span>
          </div>
        <div className="form-group mt-3">
          <div className={`${Loginstyles.flexCenterleft}`} style={{flexDirection: "column"}}>
            <TextField id="outlined-required" label="Email" variant="filled" style={{flex:1}}
                      placeholder="admin@admin.com"
                      value={email}
                      ref={ref}
                      onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className={`${Loginstyles.flexCenterleft}`} style={{flexDirection: "column"}}>
            <FormControl style={{flex:1}} variant="outlined">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
                onChange={(newpass) => setPassword(newpass.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="button" className={`py-4 px-6 font-poppins font-medium text-[15px] text-primary bg-blue-gradient rounded-[10px] outline-none`}
            onClick={()=>{test()}}
          >
              Login
          </button>
        </div>
        <p className="forgot-password text-right mt-2">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    </form>
  </div>
      )}
    </div>
    
  )
}
