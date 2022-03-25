import React from "react";
import "./PositionProperty.css";

const PositionProperty = (props) => {
  const { name, propertyInfo, onChange } = props;

  return (
    <div className="position-div field">
      <span>{name}</span>
      <span>Position*</span>
    </div>
  );
};

export default PositionProperty;
