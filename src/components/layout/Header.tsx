
import chutkime_makeover from "../../assets/chutkime_makeover.png";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import MenuPopup from "./MenuPopup";
import fevikwik from "../../assets/feviwik.png";
import usericon from "../../assets/user-icon.png";
import menuicon from "../../assets/hamburger-menu.png";
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <header className="header">
                <div className="d-flex justify-content-end gap-3 mb-3">
                    <div onClick={() => navigate('/')}>
                        <img src={usericon} alt="user-icon" />
                    </div>

                    <div onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }}>
                        <img src={menuicon} alt="menu-icon" />
                    </div>
                </div>
                <div className="brand-logo mb-3">
                    <img src={chutkime_makeover} alt="Chutki Me Makeover" style={
                        { height: pathname === "/theme" ? "43px" : "70px" }
                    } />
                    <img src={fevikwik} alt="Fevikwik" style={
                        { height: pathname === "/theme" ? "9px" : "15px", marginTop: "-3px" }
                    } />
                </div>

                {
                    pathname === "/theme" && (
                        <div className="text-center choose-theme">
                            <div onClick={() => navigate('/')}>Choose</div>
                            <div onClick={() => navigate('/theme')}>Your Theme</div>
                        </div>
                    )
                }

            </header>
            {isMenuOpen && <MenuPopup onClose={() => setIsMenuOpen(false)} />}
        </>
    );
};

export default Header;
