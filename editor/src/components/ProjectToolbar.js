import React from "react";
import "./ProjectToolbar.css";

const ProjectToolbar = (props) => {
  const { restart, saveToFile, loadFromFile } = props;
  return (
    <div className="projectToolbar">
      <div className="projectToolbar-gap"></div>
      <div className="projectToolBar-buttons">
        <div
          className="projectToolbar-buttonDiv projectToolbar-restart"
          onClick={() => restart()}
        >
          <span className="projectToolbar-button">Restart</span>
        </div>
        <div
          className="projectToolbar-buttonDiv projectToolbar-saveToFile"
          onClick={() => saveToFile()}
        >
          <span className="projectToolbar-button">Save to file</span>
        </div>
        <div
          className="projectToolbar-buttonDiv projectToolbar-loadPreset"
          onClick={() => {}}
        >
          <span className="projectToolbar-button">Load preset</span>
        </div>
        <div
          className="projectToolbar-buttonDiv projectToolbar-loadFromFile"
          onClick={() => loadFromFile()}
        >
          <span className="projectToolbar-button">Load from file</span>
        </div>
      </div>
      <div className="projectToolbar-gap"></div>
    </div>
  );
};

export default ProjectToolbar;
