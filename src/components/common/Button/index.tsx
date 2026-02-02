import React from 'react';
import Shine from '../../../assets/Shine';
import './style.scss';

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    style?: React.CSSProperties;
}

const Button = ({ label, onClick, type = "button", style }: ButtonProps) => {
    return (
        <div className='btn-wrapper' onClick={onClick}>
            <Shine />
            <button
                type={type}
                className="glossy-btn"
                style={style}
            >
                {label}
            </button>
        </div>
    );
};

export default Button;