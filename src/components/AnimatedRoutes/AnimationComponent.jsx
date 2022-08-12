import { useLocation, Route, Routes } from "react-router-dom"
import HomePage from "../../pages/HomePage/HomePage";
import GearIndexPage from "../../pages/GearIndexPage/GearIndexPage";
import GearDetailPage from "../../pages/GearDetailPage/GearDetailPage";
import ReservationDetailPage from "../../pages/ReservationDetailPage/ReservationDetailPage";
import ReservationsIndexPage from "../../pages/ReservationsIndexPage/ReservationsIndexPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import ProtectedPage from "../../pages/ProtectedPage/ProtectedPage";
import MessageBoardPage from "../../pages/MessageBoardPage/MessageBoardPage";
import { AnimatePresence } from 'framer-motion'

export default function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/rentals" element={<GearIndexPage />} />
                <Route path="/rentals/:gear_item_id" element={<GearDetailPage />} />
                <Route path="/reservations" element={<ReservationsIndexPage />} />
                <Route path="/reservations/:reservation_id" element={<ReservationDetailPage />} />
                {/* <PrivateRoute path="/protected" element={<ProtectedPage/>} exact /> */}
                <Route path="/myaccount" element={<ProtectedPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/messageboard" element={<MessageBoardPage />} />
            </Routes>
        </AnimatePresence>
    )
}