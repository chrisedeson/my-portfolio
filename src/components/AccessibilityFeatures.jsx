import React, { useEffect } from "react";

const AccessibilityFeatures = () => {
  useEffect(() => {
    // Handle keyboard navigation (Tab key)
    const handleFirstTab = (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing");

        window.removeEventListener("keydown", handleFirstTab);
        window.addEventListener("mousedown", handleMouseDownOnce);
      }
    };

    const handleMouseDownOnce = () => {
      document.body.classList.remove("user-is-tabbing");

      window.removeEventListener("mousedown", handleMouseDownOnce);
      window.addEventListener("keydown", handleFirstTab);
    };

    window.addEventListener("keydown", handleFirstTab);

    // Back to top button functionality
    const backToTopButton = document.querySelector(".back-to-top");
    let isBackToTopRendered = false;

    let alterStyles = (isVisible) => {
      backToTopButton.style.visibility = isVisible ? "visible" : "hidden";
      backToTopButton.style.opacity = isVisible ? 1 : 0;
      backToTopButton.style.transform = isVisible ? "scale(1)" : "scale(0)";
    };

    const handleScroll = () => {
      if (window.scrollY > 700) {
        isBackToTopRendered = true;
        alterStyles(isBackToTopRendered);
      } else {
        isBackToTopRendered = false;
        alterStyles(isBackToTopRendered);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDownOnce);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default AccessibilityFeatures;
