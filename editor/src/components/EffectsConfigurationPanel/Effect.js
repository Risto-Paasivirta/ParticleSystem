import React, { useContext } from "react";
import "./Effect.css";
import Module from "./Module";
import { globalStateContext } from "../Editor";
import TextureSelector from "./TextureSelector";

const Effect = (props) => {
  const { effect, title, nKey, updateEffect, removeEffect } = props;
  const { particleModules } = useContext(globalStateContext);

  return (
    <div className="effect">
      <div className="effect-titleDiv">
        <span className="effect-title">{title}</span>
        <div
          className="effect-remove"
          onClick={() => {
            removeEffect();
          }}
        ></div>
      </div>
      <div className="effect-properties">
        <TextureSelector
          selectedTextures={effect.textures}
          updateTextures={(updatedTextures) => {
            const updatedEffect = { ...effect, textures: updatedTextures };
            updateEffect(updatedEffect);
          }}
        />
        <div
          className="effect-addModuleDiv field"
          onClick={() => {
            const newModule = {
              moduleTypeId: particleModules[0].moduleTypeId,
            };
            const updatedEffect = { ...effect };
            updatedEffect.modules.unshift(newModule);
            updateEffect(updatedEffect);
          }}
        >
          <div className="effect-addModule"></div>
          <span>Add module</span>
        </div>
        {effect.modules.map((module, iModule) => (
          <Module
            module={module}
            key={`${nKey}_module${iModule}`}
            nKey={`${nKey}_module${iModule}`}
            updateModule={(updatedModule) => {
              const updatedEffect = { ...effect };
              updatedEffect.modules[iModule] = updatedModule;
              updateEffect(updatedEffect);
            }}
            removeModule={() => {
              const updatedEffect = { ...effect };
              updatedEffect.modules.splice(
                updatedEffect.modules.indexOf(module),
                1
              );
              updateEffect(updatedEffect);
            }}
            moveModuleUp={() => {
              if (iModule <= 0) return;
              const updatedEffect = { ...effect };
              updatedEffect.modules.splice(iModule, 1);
              updatedEffect.modules.splice(iModule - 1, 0, module);
              updateEffect(updatedEffect);
            }}
            moveModuleDown={() => {
              if (iModule >= effect.modules.length - 1) return;
              const updatedEffect = { ...effect };
              updatedEffect.modules.splice(iModule, 1);
              updatedEffect.modules.splice(iModule + 1, 0, module);
              updateEffect(updatedEffect);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Effect;
