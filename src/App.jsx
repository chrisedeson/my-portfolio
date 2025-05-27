import React, { useState } from "react";
import Loading from "./components/loading/Loading.jsx"; // Import the loading component
import Header from "./components/Header";
import Greeting from "./components/Greeting";
import Skills from "./components/skills/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AccessibilityFeatures from "./components/AccessibilityFeatures.jsx";
import CreatureAnimation from "./components/creatureAnimation.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoEnd = () => {
    setIsLoading(false); // Show site after video finishes
  };

  return (
    <>
      {isLoading ? (
        <Loading onVideoEnd={handleVideoEnd} /> // Pass the function to Loading component
      ) : (
        <>
        <CreatureAnimation />
          <AccessibilityFeatures />
          <Header />
          <Greeting />
          <CreatureAnimation />  
          <main role="main">
            <Skills />
            <Projects />
            <Education />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
