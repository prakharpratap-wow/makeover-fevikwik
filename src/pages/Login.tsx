import React, { useState } from 'react';
import CustomTextField from '../components/common/Textfield';
import MobileLayout from '../components/layout/MobileLayout';
import Button from '../components/common/Button';
import poweredBy from "../assets/poweredby.png"
import './Auth.scss';
import { trackEvent, ANALYTICS_CATEGORIES, ANALYTICS_ACTIONS } from '../services/analytics';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [activeScreen, setActiveScreen] = useState('login');

    const handleLogin = () => {
        trackEvent(ANALYTICS_CATEGORIES.AUTH, ANALYTICS_ACTIONS.SUCCESS, 'Login Successful');
        alert("Logged in successfully!");
    };


    const handleOtpRequest = () => {
        trackEvent(ANALYTICS_CATEGORIES.AUTH, ANALYTICS_ACTIONS.SUBMIT, 'Login - Send OTP');
        setActiveScreen('otp');
    };

    return (
        <MobileLayout>
            <div className="auth-container">
                <div className="auth-card">
                    <div className='login-title mb-3'>
                        {
                            activeScreen === 'login' ? 'REGISTER NOW TO PARTICIPATE' : 'ENTER 4 DIGIT OTP CODE'
                        }
                    </div>
                    {
                        activeScreen === 'login' ? (
                            <div>
                                <div className='mb-3'><CustomTextField placeholder='Name' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                <div className='mb-3'><CustomTextField placeholder='Phone' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                <div className='mb-3'><CustomTextField placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)} /></div>

                                <Button
                                    label="Send OTP"
                                    onClick={handleOtpRequest}
                                />
                            </div>
                        ) : (
                            <div>
                                <div className='mb-3'><CustomTextField placeholder='1234' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                <div className='mb-3'>
                                    <Button
                                        label="Verify OTP"
                                        onClick={handleLogin}
                                    />
                                </div>

                                <div>
                                    <div className='otp-warning-text'>Resend Code in 10 secs</div>
                                    <div className='otp-warning-text'>Incorrect OTP</div>
                                </div>
                            </div>
                        )
                    }
                    <div className='mt-3 powered-by-icon'>
                        <img src={poweredBy} alt="poweredBy" />
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Login;
