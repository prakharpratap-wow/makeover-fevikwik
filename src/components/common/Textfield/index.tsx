// import React from 'react';
// import './style.scss';

// const Textfield = ({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
//     return (
//         <div className='text-field-container'>
//             <input type="text" className='custom-textfield' placeholder={placeholder} value={value} onChange={onChange} />
//         </div>
//     );
// };

// export default Textfield;   


import React, { type InputHTMLAttributes } from 'react';
import './CustomTextField.scss';

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, ...props }) => {
    return (
        <div id="custom-tf-container" className='text-field-wrapper'>
            {label && <label className="custom-tf-label">{label}</label>}
            <div className="custom-tf-wrapper">
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