import React from "react";
import "./ProjectToolbar.css";

const ProjectToolbar = (props) => {
  return (
    <div className="projectToolbar">
      <span className="projectToolbar-button">Restart</span>
      <span className="projectToolbar-button">Load preset</span>
      <span className="projectToolbar-button">Save to file</span>
      <span className="projectToolbar-button">Load from file</span>
    </div>
  );
};

export default ProjectToolbar;
