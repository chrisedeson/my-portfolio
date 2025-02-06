import React from "react"
import Logo from "./Logo"
import backgroundAnimation from "../assets/images/animation-video.mp4"


export default function Header() {
    return(
        <>
            <header className="header" role="banner">
                <video preload="auto" autoPlay muted loop id="background-video" playsInline>
                    <source src={backgroundAnimation} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <Logo />

                {/* dark-light mode button */}
                {/* <input className="menu-btn" type="checkbox" id="menu-btn" /> */}
                
                <label className="menu-icon" htmlFor="menu-btn">
                    <span className="navicon"></span>
                </label>
                <div className="row">
                    <nav className="nav" role="navigation">
                        <ul className="nav__items">
                            <li className="nav__item">
                                <a href="#skills" className="nav__link">Skills</a>
                            </li>
                            <li className="nav__item">
                                <a href="#work" className="nav__link">Projects</a>
                            </li>
                            <li className="nav__item">
                                <a href="#education" className="nav__link">Education</a>
                            </li>
                            <li className="nav__item">
                                <a href="#contact" className="nav__link">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                
            </header>
      </>
    )
}