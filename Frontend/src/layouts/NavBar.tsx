import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBarStyle.css';
import image from '../assets/images/logo.png';
import ProfileButton from '../components/ui/ProfileButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface NavBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Link to="/" className="nav-link" onClick={toggleNavbar}>Home <HomeOutlinedIcon/></Link>
      </li>
      <li className="nav-item">
        <Link to="/aboutus" className="nav-link" onClick={toggleNavbar}>About <InfoOutlinedIcon/></Link>
      </li>
      {isLoggedIn ? (
        <>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" onClick={toggleNavbar}>Dashboard <InsertChartOutlinedIcon/></Link>
          </li>
          <li className="nav-item">
            <ProfileButton onLogout={onLogout} />
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
};

export default NavBar;
