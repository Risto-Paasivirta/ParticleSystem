import React from "react";
import "./EffectsConfigurationPanel.css";
import Effect from "./Effect";

const EffectsConfigurationPanel = (props) => {
  const { effects, updateEffects } = props;

  return (
    <div className="effectsConfigurationPanel">
      <div
        className="effectsConfigurationPanel-addDiv field"
        onClick={() => {
          const newEffect = {
            textures: ["generic/ball.png"],
            modules: [],
          };
          const updatedEffects = [...effects];
          updatedEffects.unshift(newEffect);
          updateEffects(updatedEffects);
        }}
      >
        <div className="effectsConfigurationPanel-add"></div>
        Add effect
      </div>
      <span className="effectsConfigurationPanel-titleEffects"></span>
      {effects.map((effect, iEffect) => (
        <Effect
          effect={effect}
          title={`Effect ${iEffect + 1}`}
          key={`effect${iEffect}`}
          nKey={`effect${iEffect}`}
          updateEffect={(updatedEffect) => {
            const updatedEffects = [...effects];
            updatedEffects[iEffect] = updatedEffect;
            updateEffects(updatedEffects);
          }}
          removeEffect={() => {
            const updatedEffects = [...effects];
            updatedEffects.splice(updatedEffects.indexOf(effect), 1);
            updateEffects(updatedEffects);
          }}
        />
      ))}
      <div className="effectsConfigurationPanel-footer"></div>
    </div>
  );
};

export default EffectsConfigurationPanel;
