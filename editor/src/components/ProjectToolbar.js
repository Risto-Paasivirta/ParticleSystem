import React from "react";
import "./ProjectToolbar.css";

const ProjectToolbar = (props) => {
  const { restart, saveToFile } = props;
  return (
    <div className="projectToolbar">
      <span className="projectToolbar-button" onClick={() => restart()}>
        Restart
      </span>
      <span className="projectToolbar-button">Load preset</span>
      <span className="projectToolbar-button" onClick={() => saveToFile()}>
        Save to file
      </span>
      <span className="projectToolbar-button">Load from file</span>
    </div>
  );
};

export default ProjectToolbar;
