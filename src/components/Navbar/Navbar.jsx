import './Navbar.css'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';


export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <div className="nav-link">
        <Link to="/">
          <img
            id="logoImg"
            src="/images/A-Lodge_logo.png"
            alt="logo"
          />
        </Link>
        <ul className="nav-list">
          <Link to="/rentals">Rentals</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/messageboard">Message Board</Link>
          {user ? (
            <>

              <Link to="/myaccount">My Account</Link>
              <Link to="/" onClick={logoutUser}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {/* <Link><a href="{% url 'logout' %}">Log Out</a></Link> */}

          {/* <Link><a href="{% url 'signup' %}">Sign Up</a></Link> */}
          {/* <Link><a href="{% url 'login' %}">Log In</a></Link> */}

        </ul>
      </div>
    </nav>
  )
}