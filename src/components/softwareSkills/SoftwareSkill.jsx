import React from "react";
import "./SoftwareSkill.css";
import { skillsSection } from "../../data.mjs"


export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
        {skillsSection.softwareSkills.map((skills, index) => {
          return (
            <li key={index} className="software-skill-inline" name={skills.skillName}>
              <i className={skills.fontAwesomeClassname}></i>
              <p>{skills.skillName}</p>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}