import React from "react";
import christopherImage from "../assets/images/christopher-fresh.jpeg";

export default function About() {
    return(
        <section className="about" id="about">
            <div className="row">
                <h2>About Me</h2>
                <div className="about__content">
                    <div className="about__text">
                        <p>
                            When I’m not coding, 
                            I’m probably debugging—or figuring out what to eat next (I love eating!😋), 
                            which is just another form of problem-solving! Always learning, always building!
                        </p>
                        <a href="https://drive.google.com/file/d/1Qzr_HkIA5JyH5LpmJ89onMAE77MO58En/view?usp=sharing" className="btn resume-btn">My Resume</a>
                    </div>

                    <div className="about__photo-container">
                        <img className="about__photo" src={christopherImage} alt="Christopher Edeson smiling in a white shirt, patterned tie, and gray hoodie with pink accents, standing outdoors with a tree in the background." />
                    </div>
                </div>
            </div>
        </section>
    );
}
