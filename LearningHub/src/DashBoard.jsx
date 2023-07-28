import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UserAuthContextProvider,ProtectedRoute } from "./firebase/firebase";
import Login from "./components/Login";
import { useUserAuth } from "./firebase/firebase";
const DashBoard = () => {
  const { signOutFirebase } = useUserAuth();
  function signOut(){
    signOutFirebase();
  }
  return(
    <div>Hi</div>
   
  );
}


export default DashBoard;
