import React from "react"
import { SiCoursera } from "react-icons/si";
import ByuLogo from "../assets/images/byu-pathway.svg"
import { SiScrimba } from "react-icons/si";

export default function Education() {
    return(
        <section className="client" id="education">
            <div className="row">
                <h2 className="education-row">Education</h2>
                <div className="client__logos">
                    {/* Coursera */}
                    <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className="client__link">
                        <SiCoursera className="client__logo coursera" tabIndex="0" />
                    </a>

                    {/* BYU-Pathway */}
                    <a href="https://www.byupathway.org" target="_blank" rel="noopener noreferrer" className="client__link">
                        <img src={ByuLogo} className="client__logo byu" alt="BYU-Pathway" tabIndex="0" />
                    </a>

                    {/* Scrimba */}
                    <a href="https://scrimba.com" target="_blank" rel="noopener noreferrer" className="client__link">
                        <SiScrimba className="client__logo scrimba" tabIndex="0" />
                    </a>
                </div>

            </div>
        </section>
    )
}
    
    