import { useTranslation } from "react-i18next";
import "./Footer.css";
const Footer = () => {
    const { t: translate } = useTranslation('common');

    return (
        <footer className="footer">
            <div className="left-child">
                <div className="footer-protection">
                   {translate("masterProgramme")}
                </div>
                <div>
                    © 2021 - MediCare. 
                   {` ${translate("reservedRights")}`}
                </div>
            </div>
            <h1 className="middle-child"> MediCare </h1>
            <div className="right-child">
                <h2>Contact: 0263-964-098</h2>
                <p>{`${translate("location")}: Cluj, Cluj-Napoca`}</p>
            </div>
        </footer>
    );
}


export default Footer;