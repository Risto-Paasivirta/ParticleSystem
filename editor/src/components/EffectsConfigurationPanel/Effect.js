import React, { useContext } from "react";
import "./Effect.css";
import Module from "./Module";
import { globalStateContext } from "../Editor";
import TextureSelector from "./TextureSelector";

const Effect = (props) => {
  const { effect, title, nKey, updateEffect } = props;
  const { particleModules } = useContext(globalStateContext);

  return (
    <div className="effect">
      <span className="effect-title">{title}</span>
      <div className="effect-properties">
        <TextureSelector
          updateTextures={(updatedTextures) => {
            const updatedEffect = { ...effect, textures: updatedTextures };
            updateEffect(updatedEffect);
          }}
        />
        <div className="effect-addModuleDiv field">
          <div className="effect-addModule"></div>
          <span>Add module</span>
        </div>
        {effect.modules.map((module, iModule) => (
          <Module
            module={module}
            key={`${nKey}_module${iModule}`}
            updateModule={(updatedModule) => {
              const updatedEffect = { ...effect };
              updatedEffect.modules[iModule] = updatedModule;
              updateEffect(updatedEffect);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Effect;
