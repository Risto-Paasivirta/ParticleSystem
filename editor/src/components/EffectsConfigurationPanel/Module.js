import React, { useContext } from "react";
import "./Module.css";
import { globalStateContext } from "../Editor";
import ModuleProperty from "./ModuleProperty/ModuleProperty";

const Module = (props) => {
  const { module, nKey, updateModule } = props;
  const { particleModules } = useContext(globalStateContext);

  const moduleInfo = particleModules.find(
    (info) => info.moduleTypeId === module.moduleTypeId
  );
  if (!moduleInfo) {
    throw new Error(`Unidentified module: ${module.moduleTypeId}`);
  }

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
          {particleModules
            .sort((a, b) => a.moduleTypeId.localeCompare(b.moduleTypeId))
            .map((moduleType, i) => (
              <option value={moduleType.moduleTypeId} key={`module-${i}`}>
                {moduleType.moduleTypeId}
              </option>
            ))}
        </select>
        <div className="module-remove"></div>
      </div>
      <div className="module-properties">
        {Object.entries(moduleInfo.properties).map(
          ([key, propertyInfo], iProperty) => (
            <ModuleProperty
              name={key}
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
