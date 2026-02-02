import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import { useMakeover } from '../context/MakeoverContext';
import poweredBy from "../assets/poweredby.png";
import '../styles/auth.scss'; // New SCSS for auth pages

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { setUserData } = useMakeover();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
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
        if (!formData.name || !formData.phone || !formData.terms) {
            alert("Please fill all required fields and accept terms.");
            return;
        }
        setUserData({ name: formData.name, phone: formData.phone, email: formData.email });
        navigate('/otp');
    };

    return (
        <MobileLayout>
            <Header />
            <div className='home-content d-flex flex-column align-items-center justify-content-center'>
                <div className="auth-card">
                    <h2 className="auth-title">REGISTER NOW TO <br /> PARTICIPATE</h2>

                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            className="auth-input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone no*"
                            className="auth-input"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            className="auth-input"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-check text-start mt-3">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">I am above 18 and would like to accept <a href="#">T&Cs</a> & <a href="#">Privacy policy</a> of Pidilite.</span>
                        </label>
                    </div>
                    <div className="form-check text-start mt-2">
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

                    <div className="mt-4">
                        <Button
                            label="Send OTP"
                            onClick={handleSendOtp}
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
