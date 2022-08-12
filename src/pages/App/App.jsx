import './App.css';
import NavBar from '../../components/Navbar/Navbar';

import { AuthProvider } from '../../context/AuthContext';
import AnimatedRoutes from '../../components/AnimatedRoutes/AnimationComponent';

export default function App() {

    return (
      <div className="App">
        <AuthProvider>
        <NavBar/>
        <AnimatedRoutes/>
        </AuthProvider>
      </div>
    );
  }


