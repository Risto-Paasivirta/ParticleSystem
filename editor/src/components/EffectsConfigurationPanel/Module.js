import React, { useContext } from "react";
import "./Module.css";
import { globalStateContext } from "../Editor";
import ModuleProperty from "./ModuleProperty/ModuleProperty";

const Module = (props) => {
  const { module, nKey, updateModule, removeModule } = props;
  const { particleModules } = useContext(globalStateContext);

  const moduleInfo = particleModules.find(
    (info) => info.moduleTypeId === module.moduleTypeId
  );
  if (!moduleInfo) {
    throw new Error(`Unidentified module: ${module.moduleTypeId}`);
  }

  const moduleCategories = Array.from(
    new Set(particleModules.map((moduleType) => moduleType.category))
  ).filter((item) => item !== undefined);

  return (
    <div className="module">
      <div className="module-title-layout field">
        <select
          className="module-typeDropdown"
          value={module.moduleTypeId}
          onChange={(e) => {
            const value = e.target.value;
            const updatedModule = { moduleTypeId: value };
            updateModule(updatedModule);
          }}
        >
          {moduleCategories
            .sort((a, b) => a.localeCompare(b))
            .map((moduleCategory, i) => (
              <optgroup label={moduleCategory} key={`module-${i}`}>
                {particleModules
                  .filter(
                    (moduleType) => moduleType.category === moduleCategory
                  )
                  .map((moduleType, i2) => (
                    <option value={moduleType.moduleTypeId}>
                      {moduleType.moduleTypeId}
                    </option>
                  ))}
              </optgroup>
            ))}
        </select>
        <div className="module-remove" onClick={() => removeModule()}></div>
      </div>
      <div className="module-properties">
        {Object.entries(moduleInfo.properties).map(
          ([key, propertyInfo], iProperty) => (
            <ModuleProperty
              name={key}
              value={module[key]}
              propertyInfo={propertyInfo}
              key={`${nKey}_property${iProperty}`}
              nKey={`${nKey}_property${iProperty}`}
              onChange={(value) => {
                const updatedModule = { ...module };
                updatedModule[key] = value;
                updateModule(updatedModule);
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Module;
