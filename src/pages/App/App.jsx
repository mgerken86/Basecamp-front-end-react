import './App.css';
import NavBar from '../../components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import GearIndexPage from '../GearIndexPage/GearIndexPage';
import GearDetailPage from '../GearDetailPage/GearDetailPage';
import ReservationDetailPage from '../ReservationDetailPage/ReservationDetailPage';
import ReservationsIndexPage from '../ReservationsIndexPage/ReservationsIndexPage';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ProtectedPage from '../ProtectedPage/ProtectedPage';
import { AuthProvider } from '../../context/AuthContext';
import PrivateRoute from '../../utils/PrivateRoute';

export default function App() {

    return (
      <div className="App">
        <AuthProvider>
        <NavBar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rentals" element={<GearIndexPage />} />
            <Route path="/rentals/:gear_item_id" element={<GearDetailPage />} />
            <Route path="/reservations" element={<ReservationsIndexPage />} />
            <Route path="/reservations/:reservation_id" element={<ReservationDetailPage/>} />
            {/* <PrivateRoute path="/protected" element={<ProtectedPage/>} exact /> */}
            <Route path="/myaccount" element={<ProtectedPage/>}  />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegistrationPage/>}/>
          </Routes>
          </AuthProvider>
      </div>
    );
  }


