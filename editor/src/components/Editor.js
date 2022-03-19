import React, { createContext, useEffect, useState } from "react";
import EffectsConfigurationPanel from "./EffectsConfigurationPanel/EffectsConfigurationPanel";
import ProjectToolbar from "./ProjectToolbar";
import ParticleSandbox from "./ParticleSandbox";
import "./Editor.css";

const globalState = {
  particleModules: [],
};
export const globalStateContext = createContext(globalState);

const Editor = (props) => {
  const [effects, setEffects] = useState([
    {
      modules: [
        {
          moduleTypeId: "PointGenerator",
          position: {
            x: (window.innerWidth - 200) / 2,
            y: (window.innerHeight - 24) / 2,
          },
        },
        {
          moduleTypeId: "RandomAngleVelocity",
        },
        {
          moduleTypeId: "LifeTimeDestructor",
        },
        {
          moduleTypeId: "LifeTimeRange",
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("config.particleModules.json")
      .then((r) => r.json())
      .then((particleModules) => {
        console.log("loaded particle modules");
        globalState.particleModules = particleModules;
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div className="editor-loading">Loading...</div>
  ) : (
    <globalStateContext.Provider value={globalState}>
      <div className="editor">
        <ProjectToolbar />
        <div className="editor-workspace">
          <ParticleSandbox effects={effects} />
          <EffectsConfigurationPanel
            effects={effects}
            updateEffects={(updatedEffects) => {
              setEffects(updatedEffects);
            }}
          />
        </div>
      </div>
    </globalStateContext.Provider>
  );
};

export default Editor;
