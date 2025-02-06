import React from "react";
import Logo from "../Logo";
import "./loading.css";
import GIF from "../../assets/images/loader.mp4";

const Loading = ({ onVideoEnd }) => {
  return (
    <div className="loading-container">
      <video
        className="loading-video"
        autoPlay
        muted
        onEnded={() => {
          console.log("Video has ended!"); // This will now log when the video ends
          onVideoEnd(); // Call the parent function
        }}
      >
        <source src={GIF} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="logo-container">
        <Logo />
      </div>
      
    </div>
  );
};

export default Loading;
