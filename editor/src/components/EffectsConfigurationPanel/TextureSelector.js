import React, { useContext } from "react";
import "./TextureSelector.css";
import { globalStateContext } from "../Editor";

const TextureSelector = (props) => {
  const { selectedTextures, updateTextures } = props;
  const { availableTextures } = useContext(globalStateContext);
  return (
    <select
      className="textureSelector-dropdown field"
      onChange={(e) => {
        const selectedTextureName = e.target.value;
        updateTextures([selectedTextureName]);
      }}
      value={selectedTextures[0]}
    >
      {availableTextures
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((textureName, iTexture) => (
          <option
            className="textureSelector-option"
            key={`texture-${iTexture}`}
          >
            {textureName}
          </option>
        ))}
    </select>
  );
};

export default TextureSelector;
