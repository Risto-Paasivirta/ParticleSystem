import React from "react";
import "./NumberProperty.css";

const NumberProperty = (props) => {
  const { name, propertyInfo, nKey, onChange } = props;
  const { tooltip, defaultValue, min, max, step } = propertyInfo;

  return (
    <div className="number-layout field">
      <span className="number-name" title={tooltip}>
        {name}
      </span>
      <input
        className="number-field"
        type={"number"}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          let value;
          try {
            value = Number(e.target.value);
          } catch (e) {
            console.warn(`NumberProperty could not parse Number`);
          }
          onChange(value);
        }}
      ></input>
    </div>
  );
};

export default NumberProperty;
