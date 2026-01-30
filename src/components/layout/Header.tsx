
import chutkime_makeover from "../../assets/chutkime_makeover.png";
import fevikwik from "../../assets/feviwik.png";
import usericon from "../../assets/user-icon.png";
import menuicon from "../../assets/hamburger-menu.png";
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="d-flex justify-content-end gap-3 mb-3">
                <div>
                    <img src={usericon} alt="user-icon" />
                </div>

                <div>
                    <img src={menuicon} alt="menu-icon" />
                </div>
            </div>
            <div className="brand-logo mb-3">
                <img src={chutkime_makeover} alt="Chutki Me Makeover" style={
                    { height: "70px" }
                } />
                <img src={fevikwik} alt="Fevikwik" style={
                    { height: "15px", marginTop: "-3px" }
                } />
            </div>

        </header>
    );
};

export default Header;
