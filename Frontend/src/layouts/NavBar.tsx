import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBarStyle.css';
import image from '../assets/images/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileButton from '../components/ui/ProfileButton';

export default function NavBar() {
    const [click, setClick] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check localStorage for a token to determine if user is logged in
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className='navbar-logo'>
                    <Link to='/'>
                        <img src={image} className="logo-img" alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-links">
                    <div className="hamburger-menu" onClick={toggleNavbar}>
                        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    </div>
                    <ul className={`navbar-nav ${isOpen ? 'active' : ''}`}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={toggleNavbar}> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/aboutus" className="nav-link" onClick={toggleNavbar}> About</Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link" onClick={toggleNavbar}> Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <ProfileButton onLogout={handleLogout}/>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={toggleNavbar}> Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}
