import React from "react";
import "./BurstListProperty.css";

const BurstListProperty = (props) => {
  const { value, name, propertyInfo, onChange } = props;

  return (
    <div className="burstListProperty-div field">
      <span>{name}</span>
      <div className="burstListProperty-nested-div">
        {value.length > 0 && (
          <table className="burstListProperty-table">
            <thead>
              <tr>
                <th>time</th>
                <th>count</th>
                <th>repeat</th>
              </tr>
            </thead>
            <tbody>
              {value
                .sort((a, b) => a.time - b.time)
                .map((burst, i) => (
                  <tr key={`burst-row-${i}`}>
                    <td>
                      <input
                        className="burstListProperty-number-field"
                        type="number"
                        value={burst.time}
                        min={0}
                        step={0.5}
                        onChange={(e) => {
                          let newValue;
                          try {
                            newValue = Number(e.target.value);
                          } catch (e) {
                            console.warn(
                              `BurstListProperty could not parse Number`
                            );
                          }
                          const newPropertyValue = [...value];
                          newPropertyValue[i] = {
                            ...newPropertyValue[i],
                            time: newValue,
                          };
                          onChange(newPropertyValue);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="burstListProperty-number-field"
                        type="number"
                        value={burst.count}
                        min={0}
                        step={10}
                        onChange={(e) => {
                          let newValue;
                          try {
                            newValue = Number(e.target.value);
                          } catch (e) {
                            console.warn(
                              `BurstListProperty could not parse Number`
                            );
                          }
                          const newPropertyValue = [...value];
                          newPropertyValue[i] = {
                            ...newPropertyValue[i],
                            count: newValue,
                          };
                          onChange(newPropertyValue);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="burstListProperty-number-field"
                        type="number"
                        value={burst.repeat !== undefined ? burst.repeat : 0}
                        min={0}
                        step={0.5}
                        onChange={(e) => {
                          let newValue;
                          try {
                            newValue = Number(e.target.value);
                            if (newValue === 0) newValue = undefined;
                          } catch (e) {
                            console.warn(
                              `BurstListProperty could not parse Number`
                            );
                          }
                          const newPropertyValue = [...value];
                          newPropertyValue[i] = {
                            ...newPropertyValue[i],
                            repeat: newValue,
                          };
                          onChange(newPropertyValue);
                        }}
                      ></input>
                    </td>
                    <td>
                      <div
                        className="burstListProperty-remove-burst"
                        onClick={() => {
                          const newValue = [...value];
                          newValue.splice(i, 1);
                          onChange(newValue);
                        }}
                      ></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <div
          className="burstListProperty-add-burst"
          onClick={() => {
            const newValue = [
              ...value,
              { time: 0, count: 20, repeat: undefined },
            ];
            onChange(newValue);
          }}
        ></div>
      </div>
    </div>
  );
};

export default BurstListProperty;
