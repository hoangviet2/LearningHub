import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UserAuthContextProvider } from "./firebase/firebase";
import Login from "./components/Login";
const DashBoard = () => (
    <UserAuthContextProvider>
        <Routes>
            <Route path="/login" element={
                <Login/>
            }/>
        </Routes>
    </UserAuthContextProvider>
);

export default DashBoard;
