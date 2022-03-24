import React from "react";
import "./NumberProperty.css";

const NumberProperty = (props) => {
  const { value, name, propertyInfo, onChange } = props;
  const { tooltip, min, max, step } = propertyInfo;

  return (
    <div className="number-layout field">
      <span className="number-name" title={tooltip}>
        {name}
      </span>
      <input
        className="number-field"
        type={"number"}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          let newValue;
          try {
            newValue = Number(e.target.value);
          } catch (e) {
            console.warn(`NumberProperty could not parse Number`);
          }
          onChange(newValue);
        }}
      ></input>
    </div>
  );
};

export default NumberProperty;
