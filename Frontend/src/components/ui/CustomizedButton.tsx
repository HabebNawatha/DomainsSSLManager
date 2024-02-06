import React from "react";
import { NavLink } from 'react-router-dom';
import '../ui/CustomizedButtonStyle.css';

interface GetStartedButtonProps{
    buttonText : string;
}

export default function GetStartedButton({ buttonText } : GetStartedButtonProps) {
    return (
        <>
        <button className="get-started-button">{buttonText}</button>
        </>
    );
}