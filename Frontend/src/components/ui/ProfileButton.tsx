import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useUser } from '../../hooks/useUser';

type Props = {
  onLogout: () => void;
};

const ProfileButton: React.FC<Props> = ({ onLogout }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        profileRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="action">
      <div className="profile" onClick={toggleDropdown} ref={profileRef}>
        <PersonOutlineOutlinedIcon />
      </div>
      <div className={`menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
        <h3>{user?.name}<br /><span>{user?.email}</span></h3>
        <ul>
          <li>
            <Link to="/profile">My Profile <AccountBoxOutlinedIcon/></Link>
          </li>
          <li>
            <Link to="/edit-profile">Edit profile</Link>
          </li>
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout <LoginOutlinedIcon/></button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
