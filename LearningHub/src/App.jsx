import styles from "./style";
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
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
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
      }/>
      <Route path="/login" element={
        <UnAuthRoute>
          <Login />
        </UnAuthRoute>
      }/>
      <Route path="/signup" element={
        <UnAuthRoute>
          <SignUp/>
        </UnAuthRoute>
      }/>
    </Routes>
  </UserAuthContextProvider>
  
);

export default App;
