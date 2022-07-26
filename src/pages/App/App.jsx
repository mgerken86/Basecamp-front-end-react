import './App.css';
import NavBar from '../../components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import GearIndexPage from '../GearIndexPage/GearIndexPage';
import GearDetailPage from '../GearDetailPage/GearDetailPage';
import ReservationDetailPage from '../ReservationDetailPage/ReservationDetailPage';
import ReservationsIndexPage from '../ReservationsIndexPage/ReservationsIndexPage';

export default function App() {

    return (
      <div className="App">
        <NavBar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rentals" element={<GearIndexPage />} />
            <Route path="/rentals/:gear_item_id" element={<GearDetailPage />} />
            <Route path="/reservations" element={<ReservationsIndexPage />} />
            <Route path="/reservations/:reservation_id" element={<ReservationDetailPage />} />
          </Routes>
      </div>
    );
  }


