import React from 'react';
import { useNavigate } from 'react-router-dom';
import otpBg from "../../assets/form-bg.png";
import poweredBy from "../../assets/poweredby.png";
import Shine from '../../assets/Shine';
import Close from '../../assets/Close';
import './MenuPopup.scss';

interface MenuPopupProps {
    onClose: () => void;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ onClose }) => {
    const navigate = useNavigate();

    const MENU_ITEMS = [
        { label: "How it works?", path: "/how-it-works" },
        { label: "My Makeover Gallery", path: "/gallery" },
        { label: "Terms & Conditions", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
    ];

    return (
        <div className="menu-popup-overlay">
            <div className="menu-popup-card" style={{ backgroundImage: `url(${otpBg})` }}>
                <button className="close-btn" onClick={onClose}>
                    <Close />
                </button>

                <div className="menu-buttons">
                    {MENU_ITEMS.map((item, index) => (
                        <div key={index} className="menu-btn" onClick={() => {
                            navigate(item.path);
                            onClose();
                        }}>
                            <Shine />
                            <div className="btn-inner">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="powered-by">
                    <img src={poweredBy} alt="Powered by Kwik GPT" />
                </div>
            </div>
        </div>
    );
};

export default MenuPopup;
