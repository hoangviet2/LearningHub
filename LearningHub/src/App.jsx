import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DashBoard from "./DashBoard";
import { ProtectedRoute, UnAuthRoute, UserAuthContextProvider } from "./firebase/firebase";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { ContextProvider } from './contexts/ContextProvider';
import WaitingRoom from "./components/WaitingRoom";
import Newsfeed from "./Pages/Newsfeeds";
import {Ecommerce} from "./Pages";
import ZegoView from "./components/ZegoCloud";
import "./index.css"
const App = () => (
  <UserAuthContextProvider>
    <Routes>
      <Route path="/" element={
        <LandingPage />
      }/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ContextProvider>
            <DashBoard />
          </ContextProvider>
        </ProtectedRoute>
      }>
        <Route path="" element={
          <Ecommerce/>
        }/>
        <Route path="newsfeed" element={
          <Newsfeed />
        }/>
        
      </Route>
      <Route path="/login" element={
        <UnAuthRoute>
          <Login />
        </UnAuthRoute>
      }/>
      <Route path="/louge" element={
        <ProtectedRoute>
          <ContextProvider>
            <WaitingRoom />

          </ContextProvider>
        </ProtectedRoute>
      }>
        <Route path="" element={
          <ZegoView/>
        }/>
      </Route>
      <Route path="/signup" element={
        <UnAuthRoute>
          <SignUp/>
        </UnAuthRoute>
      }/>
    </Routes>
  </UserAuthContextProvider>
  
);

export default App;
