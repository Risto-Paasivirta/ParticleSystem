import React from "react";
import "./PositionProperty.css";

const PositionProperty = (props) => {
  const { value, name, onChange } = props;

  return (
    <div className="field position-div">
      <span title={name}>{name}</span>
      <div className="position-child-div">
        <span>X</span>
        <input
          className="position-number-field"
          type={"number"}
          value={value.x}
          step={10}
          onChange={(e) => {
            let newValue;
            try {
              newValue = Number(e.target.value);
            } catch (e) {
              console.warn(`positionProperty could not parse Number (min)`);
            }
            onChange({ x: newValue, y: value.y });
          }}
        ></input>
      </div>
      <div className="position-child-div">
        <span>Y</span>
        <input
          className="position-number-field"
          type={"number"}
          value={value.y}
          step={10}
          onChange={(e) => {
            let newValue;
            try {
              newValue = Number(e.target.value);
            } catch (e) {
              console.warn(`positionProperty could not parse Number (max)`);
            }
            onChange({ x: value.x, y: newValue });
          }}
        ></input>
      </div>
    </div>
  );
};

export default PositionProperty;
