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
  const { propertyInfo, nKey } = props;

  switch (propertyInfo.type) {
    case "Number":
      return <NumberProperty {...props} key={nKey} />;
    case "Position":
      return <PositionProperty {...props} key={nKey} />;
    case "Range":
      return <RangeProperty {...props} key={nKey} />;
    case "Color[]":
      return <ColorPaletteProperty {...props} key={nKey} />;
    case "EasingFunction":
      return <EasingFunctionProperty {...props} key={nKey} />;
    case "Shape":
      return <ShapeProperty {...props} key={nKey} />;
    case "Burst[]":
      return <BurstListProperty {...props} key={nKey} />;
    case "Boolean":
      return <BooleanProperty {...props} key={nKey} />;
    default:
      throw new Error(
        `Unidentified module property type: ${propertyInfo.type}`
      );
  }
};

export default ModuleProperty;
