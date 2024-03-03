import React, { MouseEvent, ReactNode } from "react";
import '../ui/CustomisedButtonStyle.css';

interface CustomisedButtonProps {
    children?: ReactNode; // Allow for additional elements as children
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function CustomisedButton({ onClick, children }: CustomisedButtonProps) {
    return (
        <>
            <button className="get-started-button" onClick={onClick}>{children}</button>
        </>
    );
}
