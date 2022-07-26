import './Navbar.css'
import { Link } from "react-router-dom";
// import logoImg from '/images/A-Lodge_logo.png'

export default function NavBar() {
  return (
    <nav>
      <div className="nav-link">
        <a href="">
          <img
            id="logoImg"
            src="/images/A-Lodge_logo.png"
            alt="logo"
          />
        </a>
        <ul className="nav-list">
          {/* <Link><a href="{% url 'about' %}">About</a></Link> */}
          <Link to="/rentals">Rentals</Link>

          <Link to="/reservations">Reservations</Link>
          {/* <Link><a href="{% url 'logout' %}">Log Out</a></Link> */}

          {/* <Link><a href="{% url 'signup' %}">Sign Up</a></Link> */}
          {/* <Link><a href="{% url 'login' %}">Log In</a></Link> */}

        </ul>
      </div>
    </nav>
  )
}