import React, { useContext } from "react";
import "./Effect.css";
import Module from "./Module";
import { globalStateContext } from "../Editor";

const Effect = (props) => {
  const { effect, title, nKey, updateEffect } = props;
  const { particleModules } = useContext(globalStateContext);

  return (
    <div className="effect">
      <span className="effect-title">{title}</span>
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
  );
};

export default Effect;
