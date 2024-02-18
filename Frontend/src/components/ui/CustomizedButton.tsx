import React,{ MouseEvent }  from "react";
import { NavLink } from 'react-router-dom';
import '../ui/CustomizedButtonStyle.css';

interface GetStartedButtonProps{
    buttonText : string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function GetStartedButton({ buttonText,onClick } : GetStartedButtonProps) {
    return (
        <>
        <button className="get-started-button"  onClick={onClick} >{buttonText}</button>
        </>
    );
}