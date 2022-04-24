import React, { useContext } from "react";
import { globalStateContext } from "../../Editor";
import PositionProperty from './PositionProperty';
import NumberProperty from './NumberProperty';
import "./ShapeProperty.css";

const ShapeProperty = (props) => {
  const { value, name, onChange } = props;
  const { shapes } = useContext(globalStateContext);

  return (
    <div className="shape-div field">
      <span className="shape-name">{name}</span>
      <select
        className="shape-dropdown"
        value={value.type}
        onChange={(e) => {
          const selectedShape = shapes.find(el => el.type === e.target.value);
          onChange(selectedShape)
        }}
      >
        {shapes.map((shape) => (
          <option key={shape.type} className="shape-option">
            {shape.type}
          </option>
        ))}
      </select>
      <div className='shape-nested-div'>
        {
          (() => {
            const shape = shapes.find(el => el.type === value.type)
            if (shape) {
              return Array
                .from(Object.entries(shape))
                .filter(entry => entry[0] !== 'type')
                .map((entry) => {
                  // value type === 'Position'
                  if (entry[1] === 'Position') {
                    return (<div className='shape-property-field'>
                      <PositionProperty name={entry[0]} value={value[entry[0]] || { x: 0, y: 0 }} key={`${shape.type}-position-${entry[0]}`} onChange={(position) => {
                        value[entry[0]] = position
                        onChange(value)
                      }} />
                    </div>)
                  }
                  // value type === 'number'
                  if (entry[1] === 'number') {
                    const propertyInfo = {
                      tooltip: "",
                      min: 0,
                      max: window.innerWidth,
                      step: 1
                    }

                    return (
                      <NumberProperty name={entry[0]} value={value[entry[0]] || 10} propertyInfo={propertyInfo} key={`shape-${entry[0]}`} onChange={(number) => {
                        value[entry[0]] = number
                        onChange(value)
                      }} />
                    )
                  }
                  return null
                })
            }
          })()
        }
      </div>
    </div>
  );
};

export default ShapeProperty;
