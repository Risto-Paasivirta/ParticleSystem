import React from "react";
import "./ModuleProperty.css";
import NumberProperty from "./NumberProperty";
import PositionProperty from "./PositionProperty";

const ModuleProperty = (props) => {
  const { propertyInfo, nKey } = props;

  switch (propertyInfo.type) {
    case "Number":
      return <NumberProperty {...props} key={nKey} />;
    case "Position":
      return <PositionProperty {...props} key={nKey} />;
    default:
      throw new Error(
        `Unidentified module property type: ${propertyInfo.type}`
      );
  }
};

export default ModuleProperty;
