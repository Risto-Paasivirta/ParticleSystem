import React, { useContext } from "react";
import { globalStateContext } from "../../Editor";
import "./EasingFunctionProperty.css";

const EasingFunctionProperty = (props) => {
  const { name, value, onChange } = props;
  const { easingFunctions } = useContext(globalStateContext);

  return (
    <div className="easingFunction-div field">
      <span className="easingFunction-name">{name}</span>
      <select
        className="easingFunction-dropdown"
        value={value}
        onChange={(e) => {
          const selectedEasingFunction = e.target.value;
          onChange(selectedEasingFunction);
        }}
      >
        {easingFunctions.map((easingFunction) => (
          <option key={easingFunction} className="easingFunction-option">
            {easingFunction}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EasingFunctionProperty;
