import React from "react";
import "./Skills.css";
import SoftwareSkill from "../softwareSkills/SoftwareSkill";
import mastermindImage from "../../assets/images/mastermind.gif"
import { skillsSection } from "../../data.mjs";
import { motion } from "framer-motion";


export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-main-div">
        {/* Fade from the left */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}  // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }}      // Fade in and slide to the normal position
          transition={{ duration: 1 }}         // Duration of the fade/slide effect
        >
          <div className="skills-image-div">
            <img alt="Christopher Working" src={mastermindImage} />
          </div>
        </motion.div>

        {/* Fade from the right */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}  // Start off-screen to the right
          animate={{ opacity: 1, x: 0 }}    // Fade in and slide to the normal position
          transition={{ duration: 1 }}       // Duration of the fade/slide effect
        >
          <div className="skills-text-div">
            <h1 className="skills-heading">{skillsSection.title} </h1>
            <p className="subTitle skills-text-subtitle">{skillsSection.subTitle}</p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map(skills => {
                return <p className="subTitle skills-text" key={skills}>{skills}</p>;
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
