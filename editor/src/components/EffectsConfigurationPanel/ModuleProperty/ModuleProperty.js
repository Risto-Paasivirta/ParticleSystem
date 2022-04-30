import React from "react";
import "./ModuleProperty.css";
import NumberProperty from "./NumberProperty";
import PositionProperty from "./PositionProperty";
import RangeProperty from "./RangeProperty";
import ColorPaletteProperty from "./ColorPaletteProperty";
import EasingFunctionProperty from "./EasingFunctionProperty";
import ShapeProperty from "./ShapeProperty";
import BurstListProperty from "./BurstListProperty";
import BooleanProperty from "./BooleanProperty";

const ModuleProperty = (props) => {
  const { propertyInfo } = props;

  switch (propertyInfo.type && propertyInfo.type.toLowerCase()) {
    case "number":
      return <NumberProperty {...props} />;
    case "position":
      return <PositionProperty {...props} />;
    case "range":
      return <RangeProperty {...props} />;
    case "color[]":
      return <ColorPaletteProperty {...props} />;
    case "easingfunction":
      return <EasingFunctionProperty {...props} />;
    case "shape":
      return <ShapeProperty {...props} />;
    case "burst[]":
      return <BurstListProperty {...props} />;
    case "boolean":
      return <BooleanProperty {...props} />;
    default:
      throw new Error(
        `Unidentified module property type: ${propertyInfo.type}`
      );
  }
};

export default ModuleProperty;
