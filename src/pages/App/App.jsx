import './App.css';
import NavBar from '../../components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import GearIndexPage from '../GearIndexPage/GearIndexPage';
import GearDetailPage from '../GearDetailPage/GearDetailPage';
import ReservationDetailPage from '../ReservationDetailPage/ReservationDetailPage';
import ReservationsIndexPage from '../ReservationsIndexPage/ReservationsIndexPage';
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

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
            <PrivateRoute path="/protected" element={<ProtectedPage/>} exact />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
          </AuthProvider>
      </div>
    );
  }


