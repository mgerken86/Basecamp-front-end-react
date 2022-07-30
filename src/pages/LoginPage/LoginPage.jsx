import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from 'framer-motion'

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
            <form onSubmit={handleSubmit}>
                <h1>Login </h1>
                <hr />
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter Username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password" />
                <button type="submit">Login</button>
            </form>
        </motion.main>
    );
};
