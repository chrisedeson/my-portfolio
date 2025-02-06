import React from "react"
import emoji from "react-easy-emoji";

export default function Greeting() {
    return(
        <div className="header__text-box row" role="greeting">
            <div className="header__text">
                <h1 className="heading-primary">
                    <span className="name">Christopher Edeson
                        <span className="wave-emoji">{emoji("👋")}</span>
                    </span>
                </h1>
                <p>A passionate Frontend Developer 🚀 having an experience  
                    of building Web applications with JavaScript / Reactjs / Nodejs / 
                    React Native and some other cool libraries and frameworks.
                </p>
                <a href="#contact" className="btn btn--pink call-action-btn">Holla Me!</a>
            </div>
        </div>
    )
}