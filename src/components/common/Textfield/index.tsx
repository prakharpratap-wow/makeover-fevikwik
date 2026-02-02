


import React, { type InputHTMLAttributes } from 'react';
import Shine from '../../../assets/Shine';
import './CustomTextField.scss';

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ ...props }) => {
    return (
        <div id="custom-tf-container" className='text-field-wrapper'>
            <div className="custom-tf-wrapper">
                <Shine />
                <input
                    type="text"
                    className="custom-tf-input"
                    {...props}
                />
            </div>
        </div>
    );
};

export default CustomTextField;