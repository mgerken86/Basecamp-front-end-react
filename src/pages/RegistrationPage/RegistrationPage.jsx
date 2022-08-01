import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

export default function RegistrationPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        registerUser(username, password, password2);
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="loginCont">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <hr />
                {/* <div> */}
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                {/* </div> */}
                {/* <div> */}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                {/* </div> */}
                {/* <div> */}
                    <label htmlFor="confirm-password">Confirm</label>
                    <input
                        type="password"
                        id="confirm-password"
                        onChange={e => setPassword2(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                {/* </div> */}
                <button>Register</button>
                <hr />


            </form>
            <div className="loginBtnCont">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to='/login'>
                <button>Log In</button>
            </Link>
            </div>
            </div>
        </motion.main>
    );
}
