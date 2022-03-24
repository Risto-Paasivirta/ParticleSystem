import React from "react";
import "./EasingFunctionProperty.css";

const EasingFunctionProperty = (props) => {
  const { name, propertyInfo, onChange } = props;

  return (
    <div className="easingFunction-div field">
      <span>{name}</span>
      <span>Easing*</span>
    </div>
  );
};

export default EasingFunctionProperty;
