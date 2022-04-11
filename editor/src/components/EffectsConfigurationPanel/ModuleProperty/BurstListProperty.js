import React from "react";
import "./BurstListProperty.css";

const BurstListProperty = (props) => {
  const { name, propertyInfo, onChange } = props;

  return (
    <div className="burstListProperty-div field">
      <span>{name}</span>
      <span>BurstList*</span>
    </div>
  );
};

export default BurstListProperty;
