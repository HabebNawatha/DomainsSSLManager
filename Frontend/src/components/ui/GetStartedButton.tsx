import { NavLink } from 'react-router-dom';

import '../ui/GetStartedButtonStyle.css';

export default function GetStartedButton() {
    return (
        <>
         <NavLink 
            to="/getstarted"
            className="get-started-nav-link">
        <button className="get-started-button"> Get Started</button>
        </NavLink>
        </>
    );
}