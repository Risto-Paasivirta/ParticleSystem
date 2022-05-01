import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import EffectsConfigurationPanel from "./EffectsConfigurationPanel/EffectsConfigurationPanel";
import ProjectToolbar from "./ProjectToolbar";
import ParticleSandbox from "./ParticleSandbox";
import "./Editor.css";
import { downloadObject } from "../other/utils";

const globalState = {
  particleModules: [],
  easingFunctions: [],
  availableTextures: [],
  shapes: [],
  presetEffects: [],
};
export const globalStateContext = createContext(globalState);

const Editor = (props) => {
  const [effects, setEffects] = useState([]);

  const [loading, setLoading] = useState(true);

  const { particleModules } = useContext(globalStateContext);

  useEffect(() => {
    // Load config files.
    const promiseCoreLibraryConfig = fetch("config.modularParticleSystem.json")
      .then((r) => r.json())
      .then((coreLibraryConfig) => {
        console.log("loaded core library config");
        const { particleModules, easingFunctions, shapes } = coreLibraryConfig;
        globalState.particleModules = particleModules;
        globalState.easingFunctions = easingFunctions;
        globalState.shapes = shapes;

        setEffects(
          defaultParticleSystemConf.map((effect) =>
            loadParticleEffectDefaults(effect, particleModules)
          )
        );
      });

    const promiseTextures = fetch("config.textures.json")
      .then((r) => r.json())
      .then((textureNames) => {
        console.log("loaded available textures");
        globalState.availableTextures = textureNames;
      });

    const promisePresetEffects = fetch("config.presetParticleEffects.json")
      .then((r) => r.json())
      .then((presetEffects) => {
        console.log("loaded preset effects");
        globalState.presetEffects = presetEffects;
      });

    Promise.all([
      promiseCoreLibraryConfig,
      promiseTextures,
      promisePresetEffects,
    ]).then((_) => {
      setLoading(false);
    });
  }, []);

  const refLoadFileInput = useRef(null);

  return loading ? (
    <div className="editor-loading">Loading...</div>
  ) : (
    <globalStateContext.Provider value={globalState}>
      <div className="editor">
        <ProjectToolbar
          restart={() => {
            setEffects([...effects]);
          }}
          saveToFile={() => {
            const particleSystemObject = {
              effects: effects.map((effect) => ({
                textures: effect.textures,
                modules: effect.modules,
              })),
            };
            downloadObject(particleSystemObject, "particleSystem.json");
          }}
          loadPreset={(particleSystemData) => {
            setEffects(particleSystemData.effects);
          }}
          loadFromFile={() => {
            const fileInput = refLoadFileInput.current;
            if (!fileInput) return;
            fileInput.click();
          }}
        />
        <div className="editor-workspace">
          <ParticleSandbox effects={effects} />
          <EffectsConfigurationPanel
            effects={effects}
            updateEffects={(updatedEffects) => {
              updatedEffects = updatedEffects.map((effect) =>
                loadParticleEffectDefaults(effect, particleModules)
              );
              setEffects(updatedEffects);
            }}
          />
        </div>
      </div>
      <input
        className="editor-fileInput"
        type={"file"}
        ref={refLoadFileInput}
        accept={".json"}
        onChange={async (e) => {
          try {
            const file = e.target.files[0];
            const loadedParticleSystem = await new Response(file).json();
            setEffects(loadedParticleSystem.effects);
          } catch (e) {
            alert(`Unexpected error while loading file.\n${e.message}`);
          }
        }}
      />
    </globalStateContext.Provider>
  );
};

const defaultParticleSystemConf = [
  {
    textures: ["ball.png"],
    modules: [
      {
        moduleTypeId: "PointGenerator",
      },
      {
        moduleTypeId: "RandomAngleVelocity",
        min: 50,
        max: 100,
      },
      {
        moduleTypeId: "RandomScale",
        min: 0.5,
        max: 0.8,
      },
      {
        moduleTypeId: "RandomColor",
      },
      {
        moduleTypeId: "LifeTimeRange",
      },
      {
        moduleTypeId: "AlphaOverLifetime",
      },
      {
        moduleTypeId: "LifeTimeDestructor",
      },
    ],
  },
];

const loadParticleEffectDefaults = (effect, particleModulesInfo) => {
  // Assign any missing properties to their defaultValue
  // Show warning for any missing defaultValues

  const effectResult = { textures: effect.textures, modules: [] };
  effect.modules.forEach((module) => {
    const moduleResult = { ...module };
    const moduleInfo = particleModulesInfo.find(
      (info) => info.moduleTypeId === module.moduleTypeId
    );
    Object.entries(moduleInfo.properties).forEach(
      ([propertyKey, propertyInfo]) => {
        const curValue = moduleResult[propertyKey];
        if (curValue !== undefined) return;
        if (!("defaultValue" in propertyInfo)) {
          console.warn(
            `Missing property @defaultValue ${module.moduleTypeId}: ${propertyKey}`
          );
          return;
        }

        let defaultValue = propertyInfo.defaultValue;
        // defaultValue info is always parsed as strings
        // Casting to the proper JS data type is important here so that "save to file" works correctly.

        if (propertyInfo.type === "Number") {
          try {
            defaultValue = Number(defaultValue);
          } catch (e) {
            console.error(`Number defaultValue parsing error ${defaultValue}`);
          }
        } else if (propertyInfo.type === "Boolean") {
          defaultValue = defaultValue.toLowerCase() === "true" ? true : false;
        } else if (propertyInfo.type === "EasingFunction") {
          // Load default value as string
          if (typeof defaultValue !== "string")
            throw new Error(
              `defaultValue parsing error ${propertyInfo.type} (${defaultValue})`
            );
        } else if (
          propertyInfo.type === "Range" ||
          propertyInfo.type === "Burst[]" ||
          propertyInfo.type === "Position" ||
          propertyInfo.type === "Color[]" ||
          propertyInfo.type === "Shape"
        ) {
          try {
            defaultValue = JSON.parse(defaultValue);
          } catch (e) {
            console.error(
              `defaultValue parsing error ${propertyInfo.type} (${defaultValue})`
            );
          }
        } else {
          throw new Error(`Unhandled defaultValue type: ${propertyInfo.type}`);
        }

        moduleResult[propertyKey] = defaultValue;
      }
    );
    effectResult.modules.push(moduleResult);
  });
  return effectResult;
};

export default Editor;
