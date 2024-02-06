import { Link, NavLink } from 'react-router-dom';
import '../assets/NavBarStyle.css'
import image from '../logo.svg';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import GetStartedButton from '../components/ui/GetStartedButton';


export default function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-logo'>
                    <Link to='/'>
                    <img src={image} alt="Logo" style={{ width: '50px', height: 'auto' }} />
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
                            <GetStartedButton/>
                    </ul>
                
                </div>
                <i className='menu-icon' onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}</i>
            </nav>
            
        </>
    )
}