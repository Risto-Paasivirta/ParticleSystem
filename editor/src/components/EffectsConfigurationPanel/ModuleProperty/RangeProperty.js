import React from "react";
import "./RangeProperty.css";

const RangeProperty = (props) => {
  const { value, name, propertyInfo, onChange } = props;
  const { tooltip, min, max, step } = propertyInfo;

  return (
    <div className="field range-div">
      <span title={tooltip}>{name}</span>
      <div className="range-child-div">
        <span>min</span>
        <input
          className="range-number-field"
          type={"number"}
          value={value.min}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            let newValue;
            try {
              newValue = Number(e.target.value);
            } catch (e) {
              console.warn(`RangeProperty could not parse Number (min)`);
            }
            onChange({ min: newValue, max: value.max });
          }}
        ></input>
      </div>
      <div className="range-child-div">
        <span>max</span>
        <input
          className="range-number-field"
          type={"number"}
          value={value.max}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            let newValue;
            try {
              newValue = Number(e.target.value);
            } catch (e) {
              console.warn(`RangeProperty could not parse Number (max)`);
            }
            onChange({ min: value.min, max: newValue });
          }}
        ></input>
      </div>
    </div>
  );
};

export default RangeProperty;
