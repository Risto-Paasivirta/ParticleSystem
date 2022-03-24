import React from "react";
import "./ColorPaletteProperty.css";

const ColorPaletteProperty = (props) => {
  const { name, propertyInfo, onChange } = props;

  return (
    <div className="colorPalette-div field">
      <span>{name}</span>
      <span>Color[]*</span>
    </div>
  );
};

export default ColorPaletteProperty;
