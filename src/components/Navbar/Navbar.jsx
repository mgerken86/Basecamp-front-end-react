import './Navbar.css'
import { Link } from "react-router-dom";
// import logoImg from '/images/A-Lodge_logo.png'

export default function NavBar() {
  return (
    <nav>
      <div class="nav-link">
        <a href="">
          <img
            id="logoImg"
            src="/images/A-Lodge_logo.png"
            alt="logo"
          />
        </a>
        <ul class="nav-list">
          {/* <Link><a href="{% url 'about' %}">About</a></Link>
          <Link><a href="{% url 'index' %}">Rentals</a></Link>

          <Link><a href="{% url 'reservations_index' %}">Reservations</a></Link>
          <Link><a href="{% url 'logout' %}">Log Out</a></Link>

          <Link><a href="{% url 'signup' %}">Sign Up</a></Link>
          <Link><a href="{% url 'login' %}">Log In</a></Link> */}

        </ul>
      </div>
    </nav>
  )
}