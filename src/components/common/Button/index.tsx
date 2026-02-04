import React from 'react';
import Shine from '../../../assets/Shine';
import './style.scss';

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    style?: React.CSSProperties;
    isLoading?: boolean;
    disabled?: boolean;
}

const Button = ({ label, onClick, type = "button", style, isLoading, disabled }: ButtonProps) => {
    return (
        <div className={`btn-wrapper ${disabled || isLoading ? 'disabled' : ''}`} onClick={(disabled || isLoading) ? undefined : onClick}>
            {!disabled && !isLoading && <Shine />}
            <button
                type={type}
                className="glossy-btn"
                style={{ ...style, opacity: (disabled || isLoading) ? 0.7 : 1, cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer' }}
                disabled={disabled || isLoading}
            >
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    label
                )}
            </button>
        </div>
    );
};

export default Button;