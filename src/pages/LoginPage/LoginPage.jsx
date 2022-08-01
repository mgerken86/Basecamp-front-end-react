import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from 'framer-motion'
import './LoginPage.css'
import { Link } from "react-router-dom";

export default function LoginPage() {
    const { loginUser } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        username.length > 0 && loginUser(username, password);
    };

    return (
        <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="loginCont">
            <h1>Login </h1>
            <form onSubmit={handleSubmit}>
                <hr />
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter Username" />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password" />
                </div>
                <button type="submit">Login</button>
                <hr />
            </form>
            <div className="loginBtnCont">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to='/register'>
                <button>Register</button>
            </Link>
            </div>
            {/* <img
                id='homeLogoImg'
                src='/images/logo.png'
                alt="logo"
            /> */}
            </div>
        </motion.main>
    );
};
