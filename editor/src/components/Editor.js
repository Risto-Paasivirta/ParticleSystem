import React, { createContext, useEffect, useState } from "react";
import EffectsConfigurationPanel from "./EffectsConfigurationPanel/EffectsConfigurationPanel";
import ProjectToolbar from "./ProjectToolbar";
import ParticleSandbox from "./ParticleSandbox";
import "./Editor.css";
import * as PIXI from "pixi.js";

const globalState = {
  particleModules: [],
  /**
   * Object where key = name of sprite and value = PIXI.js Texture
   */
  availableTextures: {},
};
export const globalStateContext = createContext(globalState);

const Editor = (props) => {
  const [effects, setEffects] = useState([
    {
      textures: ["generic/ball.png"],
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
        {
          moduleTypeId: "RandomScale",
          min: 0.3,
          max: 0.5,
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load config files.
    const promiseParticleModules = fetch("config.particleModules.json")
      .then((r) => r.json())
      .then((particleModules) => {
        console.log("loaded particle modules");
        globalState.particleModules = particleModules;
      });

    const promiseSpriteSheets = fetch("config.spritesheets.json")
      .then((r) => r.json())
      .then((spriteSheetNames) => {
        console.log("loaded spritesheet names");
        const loader = PIXI.Loader.shared;
        if (!loader.resources.spritesheet) {
          spriteSheetNames.forEach((name) => {
            loader.add(name, `sprites/${name}`);
          });
          loader.load();

          return new Promise((resolve) => {
            loader.onComplete.once((_, resources) => {
              console.log("loaded spritesheets");
              const availableTexturesList = Object.values(resources).map(
                (resource) => resource.textures
              );
              const availableTextures = availableTexturesList.reduce(
                (prev, cur) => ({ ...prev, ...cur }),
                {}
              );

              globalState.availableTextures = availableTextures;
              resolve();
            });
          });
        }
      });

    Promise.all([promiseParticleModules, promiseSpriteSheets]).then((_) => {
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
