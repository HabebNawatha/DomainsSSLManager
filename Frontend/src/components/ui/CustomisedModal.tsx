import React, { ReactNode } from 'react';
import './CustomisedModalStyle.css';
import CloseIcon from '@mui/icons-material/Close';
import CustomisedButton from './CustomisedButton';
import Button from '@mui/material/Button';

interface CustomisedModalProps {
    onClose: () => void;
    title: string;
    children?: ReactNode;
}

const CustomisedModal: React.FC<CustomisedModalProps> = ({ onClose, title, children }) => {
    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-btn" onClick={handleClose}>
                    <CloseIcon />
                </button>
                <div className='modal-title'><h2>{title}</h2></div>
                <div className="modal-content">
                    {children}
                </div>
                <CustomisedButton onClick={handleSubmit}>Add to Dashboard</CustomisedButton>
            </div>
        </div>
    );
};

export default CustomisedModal;
