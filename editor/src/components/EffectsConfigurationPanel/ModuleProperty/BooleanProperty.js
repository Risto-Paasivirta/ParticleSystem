import React from "react";
import "./BooleanProperty.css";

const BooleanProperty = (props) => {
  const { value, name, propertyInfo, onChange } = props;

  return (
    <div className="boolean-div field">
      <span>{name}</span>
      <input
        className="boolean-field"
        checked={value}
        type={"checkbox"}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      ></input>
    </div>
  );
};

export default BooleanProperty;
