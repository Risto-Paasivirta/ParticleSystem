import React, { useContext } from "react";
import { globalStateContext } from "../../Editor";
import "./ShapeProperty.css";
import ModuleProperty from "./ModuleProperty";

const ShapeProperty = (props) => {
  const { value, name, onChange } = props;
  const { shapes } = useContext(globalStateContext);
  const shape = shapes.find((el) => el.type === value.type);
  return (
    <div className="shape-div field">
      <div className="shape-headerContainer">
        <span className="shape-name">{name}</span>
        <select
          className="shape-dropdown"
          value={value.type}
          onChange={(e) => {
            const selectedShape = shapes.find(
              (el) => el.type === e.target.value
            );
            try {
              const defaultValue = JSON.parse(selectedShape.defaultValue);
              onChange(defaultValue);
            } catch (e) {
              console.error(
                `Error parsing shape @defaultValue: ${selectedShape}`
              );
            }
          }}
        >
          {shapes.map((shape) => (
            <option key={shape.type} className="shape-option">
              {shape.type}
            </option>
          ))}
        </select>
      </div>
      <div className="shape-valuesContainer">
        {Array.from(Object.entries(shape))
          .filter((entry) => entry[0] !== "type" && entry[0] !== "defaultValue")
          .map((entry, i) => {
            return (
              <ModuleProperty
                name={entry[0]}
                value={value[entry[0]]}
                propertyInfo={{
                  type: entry[1],
                }}
                key={`shape-value-${i}`}
                onChange={(newPropertyValue) => {
                  const newValue = { ...value };
                  newValue[entry[0]] = newPropertyValue;
                  onChange(newValue);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ShapeProperty;
