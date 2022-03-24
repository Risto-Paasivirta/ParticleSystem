import React from "react";
import "./RangeProperty.css";

const RangeProperty = (props) => {
  const { name, propertyInfo, onChange } = props;

  return (
    <div className="range-div field">
      <span>{name}</span>
      <span>Range*</span>
    </div>
  );
};

export default RangeProperty;
