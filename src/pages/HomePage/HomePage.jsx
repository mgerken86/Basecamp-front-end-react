import './HomePage.css'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function HomePage(){
    const { user } = useContext(AuthContext);
    return (
        <main>
            <h1>Home Page</h1>
            <h2>Hello, {user.username}</h2>
        </main>
    )
}