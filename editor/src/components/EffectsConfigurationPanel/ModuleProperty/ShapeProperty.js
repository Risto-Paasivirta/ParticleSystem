import React from "react";
import "./ShapeProperty.css";

const ShapeProperty = (props) => {
  const { name, propertyInfo, onChange } = props;

  return (
    <div className="shape-div field">
      <span>{name}</span>
      <span>Shape*</span>
    </div>
  );
};

export default ShapeProperty;