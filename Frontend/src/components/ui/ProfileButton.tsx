
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './ProfileButton.css';

type Props = {
    onLogout: () => void; 
}

const ProfileButton: React.FC<Props> = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        onLogout();
        toggleNavbar();
    }

    return (
        <div className="profile-button-container">
            <button className="profile-button" onClick={toggleDropdown}>
                <FaUser className="profile-icon" />
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <Link to="/profile" className="profile-link" onClick={toggleNavbar}> Profile</Link>
                    <button className="dropdown-option" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileButton;
