import './NavBar.css'
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
      <div class="nav-link">
        <a href="{% url 'home' %}">
            <img 
            id="logoImg"
            src="{% static 'images/A-Lodge_logo.png'%}" 
            alt="logo"
            />
        </a>
        <ul class="nav-list">
          <li><a href="{% url 'about' %}">About</a></li>
          <li><a href="{% url 'index' %}">Rentals</a></li>

          <li><a href="{% url 'reservations_index' %}">Reservations</a></li>
          <li><a href="{% url 'logout' %}">Log Out</a></li>

          <li><a href="{% url 'signup' %}">Sign Up</a></li>
          <li><a href="{% url 'login' %}">Log In</a></li>

        </ul>
      </div>
    </nav>
    )
}