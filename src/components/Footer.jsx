import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faXTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer(){
    return (
        <footer className="footer">
            <div className="footer-content">
               <h4 className="logo-footer">EVENTIO</h4>
               <div className="services-footer">
                    <h4 className="footer-section-heading">SERVICES</h4>
                </div>
               <div className="sources-footer">
                    <h4 className="footer-section-heading">SOURCES</h4>
               </div>
               <div className="connect-footer">
                    <h4 className="footer-section-heading">CONNECT</h4>
                    <a id="fcbk1" href="https://www.facebook.com/" ><FontAwesomeIcon icon={faSquareFacebook} style={styles.icon} /></a>
                    <a id="x1" href="https://x.com/?lang=en&mx=2" ><FontAwesomeIcon icon={faXTwitter} style={styles.icon} /></a>
                    <a id="lnkn1" href="https://www.linkedin.com/" ><FontAwesomeIcon icon={faLinkedin} style={styles.icon} /></a>
                    <a id="insg1" href="https://www.instagram.com/" ><FontAwesomeIcon icon={faInstagram} style={styles.icon} /></a>
                </div>
            </div>
            <div className="copyrights">
                © 2025 EVENTIO. All rights reserved. 
            </div>
        </footer>
    )
}

const styles = {
    icon: {
        color: "#fff",
        fontSize: "20px",
        margin: "0 10px",
        cursor: "pointer",
    },
}

export default Footer