import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import CustomTextField from '../components/common/Textfield';
import { useMakeover } from '../context/MakeoverContext';
import poweredBy from "../assets/poweredby.png";
import '../styles/auth.scss';
import { toast } from 'react-toastify';
import { trackEvent, ANALYTICS_CATEGORIES, ANALYTICS_ACTIONS } from '../services/analytics';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { setUserData } = useMakeover();
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        terms: false,
        promo: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSendOtp = () => {
        // Basic requirement check
        if (!formData.name || !formData.whatsapp || !formData.terms) {
            toast.error("Please fill all required fields and accept terms.");
            return;
        }

        // Email validation (if provided)
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                toast.error("Please enter a valid email address.");
                return;
            }
        }

        // WhatsApp number validation
        const phoneRegex = /^[1-9][0-9]{9}$/;
        if (!phoneRegex.test(formData.whatsapp)) {
            if (formData.whatsapp.startsWith('0')) {
                toast.error("Phone number cannot start with 0.");
            } else if (formData.whatsapp.length !== 10) {
                toast.error("Phone number must be exactly 10 digits.");
            } else {
                toast.error("Please enter a valid 10-digit phone number.");
            }
            return;
        }

        trackEvent(ANALYTICS_CATEGORIES.AUTH, ANALYTICS_ACTIONS.SUBMIT, 'Register Form - Send OTP');
        setUserData({ name: formData.name, phone: formData.whatsapp, email: formData.email });
        navigate('/otp');
    };

    return (
        <MobileLayout>
            <Header />
            <div className='home-content d-flex flex-column align-items-center justify-content-center'>
                <div className="auth-card" style={{ backgroundSize: "contain" }}>
                    <h2 className="auth-title">REGISTER NOW TO <br /> PARTICIPATE</h2>

                    <div className="mb-2">
                        <CustomTextField
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-2">
                        <CustomTextField
                            placeholder="Whatsapp No"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-2">
                        <CustomTextField
                            placeholder="Email ID"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>



                    <div className="form-check-t text-start mt-3">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">I am above 18 and would like to accept <a href="#">{"T&Cs"}</a> & <a href="#">Privacy policy</a> of Pidilite.</span>
                        </label>
                    </div>
                    <div className="form-check-t text-start mt-2">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                name="promo"
                                checked={formData.promo}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">I consent to receiving promotional communication from Pidilite about its products & offers.</span>
                        </label>
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <Button
                            label="Send OTP"
                            onClick={handleSendOtp}
                            style={{ fontSize: "14px", padding: "7px 40px" }}
                        />
                    </div>

                    <div className='powered-by-icon mt-4'>
                        <img src={poweredBy} alt="poweredBy" style={{ height: '20px' }} />
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Register;
