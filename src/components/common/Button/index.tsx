import React from 'react';
import './style.scss';

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
    return (
        <button
            type={type}
            className="glossy-btn"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;