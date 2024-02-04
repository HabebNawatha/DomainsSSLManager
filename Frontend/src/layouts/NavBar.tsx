import {Link} from 'react-router-dom';
import '../assets/NavBarStyle.css'
import image from '../logo.svg';


export default function NavBar(){
    return(
        <nav className='navbar'>
        <img src={image} alt="Logo" style={{ width: '50px', height: 'auto' }} />
        <div className="navbar-container">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/aboutus'>About Us</Link></li>
                <li><Link to='/'>Get started</Link></li>
            </ul>
        </div>
        </nav>
    )
}