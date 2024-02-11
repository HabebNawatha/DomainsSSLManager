import '../assets/AboutUsPageStyle.css';
import image from '../assets/images/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useState } from 'react';

export default function AboutUsPage() {

    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
    const [isBlurred, setIsBlurred] = useState(false);

    const handleMenuItemClick = (menuItem: string) => {
        if (menuItem === activeMenuItem) {
            setActiveMenuItem(null);
            setIsBlurred(false);
        } else {
            setActiveMenuItem(menuItem);
            setIsBlurred(true);
        }

    };
    const handleCloseButtonClick = () => {
        setActiveMenuItem(null);
        setIsBlurred(false);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const menuItemsContent: { [key: string]: string } = {
        "About Us": "Welcome to our platform! We are passionate about simplifying SSL certificate management  and making it accessible to everyone. In today's digital age, securing your online presence  is more important than ever, and SSL certificates play a crucial role in ensuring the security and integrity of your website.",
        "Technology": "Our platform utilizes cutting-edge technology to ensure the highest level of security and reliability for our users. Leveraging state-of-the-art encryption algorithms and advanced authentication protocols we provide a robust framework that safeguards your data and transactions. Our scalable infrastructure is built on cloud-based architecture, ensuring seamless performance and uninterrupted availability.With continuous updates and enhancements, we stay ahead of emerging threats and evolving industry standards,ensuring that your digital assets remain protected in today's dynamic digital landscape.",
        "Importance": "In today's digital age, securing your online presence  is more important than ever, and SSL certificates play a crucial role in ensuring the security and integrity of your website.",
        "Features": "Automated SSL certificates renewal and maintenance & we offer a simple easy to use dashboard to keep you updated on your certificate dates and status.",
        "Contact": "Feel free to contact us at: test@gmail.com",
    };

    return (
        <div className={`about-us-main-container ${activeMenuItem ? 'blurred' : ''}`}>            <div className="about-us-heading-container">
            <h1>SCERTIFY</h1>
            <h2>Everything you need to know!</h2>
        </div>
            <div className="about-us-menu-container">
                {Object.keys(menuItemsContent).map((menuItem) => (
                    <div className="menu-item" key={menuItem}>
                        <div
                            className={activeMenuItem === menuItem ? 'menu-item-circle active' : 'menu-item-circle'}
                            onClick={() => handleMenuItemClick(menuItem)}
                        >
                            {menuItem}
                        </div>
                        {activeMenuItem === menuItem && (
                            <div className='menu-item-content'>
                                <button className="close-button" onClick={() => setActiveMenuItem(null)}>x</button>
                                {menuItemsContent[menuItem]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}



