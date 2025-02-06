import React from "react";
import { FaFacebook, FaGithub, FaWhatsapp, FaLinkedin, FaArrowUp } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer role="contentinfo" className="footer">
                <div className="row">
                    <ul className="footer__social-links">
                        <li className="footer__social-link-item">
                            <a href="https://facebook.com/christopher.edeson/" title="Link to Facebook Profile">
                                <FaFacebook className="footer__social-image" />
                            </a>
                        </li>
                        <li className="footer__social-link-item">
                            <a href="https://github.com/chrisedeson/" title="Link to Github Profile">
                                <FaGithub className="footer__social-image"/>
                            </a>
                        </li>
                        <li className="footer__social-link-item">
                            <a href="https://wa.me/2349068705107/" title="Link to WhatsApp Profile">
                                <FaWhatsapp className="footer__social-image" />
                            </a>
                        </li>
                        <li className="footer__social-link-item">
                            <a href="https://www.linkedin.com/in/christopher-edeson/">
                                <FaLinkedin className="footer__social-image" />
                            </a>
                        </li>
                    </ul>

                    <p>
                        &copy; {currentYear} - Christopher Edeson
                    </p>
                </div>
            </footer>
            {/* Back to Top Button */}
            <a href="#top" className="back-to-top" title="Back to Top">
                <FaArrowUp className="back-to-top__image" />
            </a>
        </>
    );
}
