import React, { useState, useContext } from "react";
import "./ProjectToolbar.css";
import { globalStateContext } from "./Editor";

const ProjectToolbar = (props) => {
  const { restart, saveToFile, loadFromFile, loadPreset } = props;

  const { presetEffects } = useContext(globalStateContext);

  const [presetsVisible, setPresetsVisible] = useState(false);

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
          onClick={() => {
            setPresetsVisible(!presetsVisible);
          }}
        >
          <span className="projectToolbar-button">Load preset</span>
          <div
            className={`projectToolbar-preset-container${
              presetsVisible ? " projectToolbar-preset-container-visible" : ""
            }`}
          >
            {presetsVisible &&
              presetEffects.map((presetEffect, i) => (
                <div
                  className="projectToolBar-preset-item"
                  key={`preset-${i}`}
                  onClick={() => {
                    loadPreset(presetEffect.data);
                    setPresetsVisible(false);
                  }}
                >
                  <div
                    className="projectToolBar-preset-thumbnail"
                    style={{
                      backgroundImage:
                        presetEffect.thumbnail &&
                        `url(presetThumbnails/${presetEffect.thumbnail})`,
                    }}
                  />
                  <span className="projectToolBar-preset-label">
                    {presetEffect.label}
                  </span>
                </div>
              ))}
          </div>
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
