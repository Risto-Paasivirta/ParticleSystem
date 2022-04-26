import React, { useContext } from "react";
import { globalStateContext } from "../../Editor";
import "./ShapeProperty.css";
import ModuleProperty from "./ModuleProperty";

const ShapeProperty = (props) => {
  const { value, name, onChange, nKey } = props;
  const { shapes } = useContext(globalStateContext);
  const shape = shapes.find((el) => el.type === value.type);
  return (
    <div className="shape-div field" key={nKey}>
      <div className="shape-headerContainer">
        <span className="shape-name">{name}</span>
        <select
          className="shape-dropdown"
          value={value.type}
          onChange={(e) => {
            const selectedShape = shapes.find(
              (el) => el.type === e.target.value
            );
            onChange(selectedShape);
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
          .filter((entry) => entry[0] !== "type")
          .map((entry, i) => {
            return (
              <ModuleProperty
                name={entry[0]}
                value={value[entry[0]]}
                propertyInfo={{
                  type: entry[1],
                }}
                key={`shape-value-${i}`}
                onChange={(value) => {
                  // TODO
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ShapeProperty;
