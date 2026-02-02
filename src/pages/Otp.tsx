import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import { useMakeover } from '../context/MakeoverContext';
import poweredBy from "../assets/poweredby.png";
import '../styles/auth.scss';

const Otp: React.FC = () => {
    const navigate = useNavigate();
    const { userData } = useMakeover();
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (!userData) {
            navigate('/register');
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [userData, navigate]);

    const handleVerify = () => {
        if (otp === '1234') {
            alert("Verification Successful! (Flow End)");
            // Redirect to home or result?
            navigate('/');
        } else {
            alert("Invalid OTP! Try 1234");
        }
    };

    const handleResend = () => {
        setTimer(10);
        alert("OTP Resent!");
    };

    return (
        <MobileLayout>
            <Header />
            <div className='home-content d-flex flex-column align-items-center justify-content-center'>
                <div className="auth-card">
                    <h2 className="auth-title">Enter 4 Digit <br /> OTP Code</h2>

                    <div className="form-group mb-4">
                        <input
                            type="text"
                            placeholder="1234"
                            className="auth-input text-center"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={4}
                            style={{ letterSpacing: '5px', fontSize: '1.2rem' }}
                        />
                    </div>

                    <div>
                        <Button
                            label="Verify OTP"
                            onClick={handleVerify}
                        />
                    </div>

                    <div className="mt-3">
                        <div className="resend-link" onClick={timer === 0 ? handleResend : undefined} style={{ opacity: timer === 0 ? 1 : 0.5 }}>
                            {timer > 0 ? `Resend code in 00:${timer.toString().padStart(2, '0')}` : 'Resend Code'}
                        </div>
                        <div className="resend-link mt-2">
                            Entered Incorrect Number?
                        </div>
                    </div>

                    <div className='powered-by-icon mt-4'>
                        <img src={poweredBy} alt="poweredBy" style={{ height: '20px' }} />
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Otp;
