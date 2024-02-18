import { Link, NavLink } from 'react-router-dom';
import '../assets/styles/NavBarStyle.css'
import image from '../assets/images/logo.png';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import GetStartedButton from '../components/ui/CustomizedButton';


export default function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    function onClick() {


    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-logo'>
                    <Link to='/'>
                        <img src={image} className="logo-img" alt="Logo" />
                    </Link>
                </div>
                <div id='navbar-container' className={click ? "#navbar-container mobile" : "navbar-container"}>
                    <ul>
                        <li className='nav-item'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    "nav-links" + (isActive ? " activated" : "")}
                            >
                                Home
                            </NavLink>

                        </li>
                        <li className='nav-item'>
                            <NavLink
                                to="/aboutus"
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            >
                                About Us
                            </NavLink>

                        </li>
                        <NavLink
                            to="/getstarted"
                            className="get-started-nav-link">
                            <GetStartedButton buttonText="Get Started" onClick={onClick} />
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className="get-started-nav-link">
                            <GetStartedButton buttonText="My Dashboard" onClick={onClick} />
                        </NavLink>
                    </ul>

                </div>
                <i className='menu-icon' onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}</i>
            </nav>

        </>
    )
}