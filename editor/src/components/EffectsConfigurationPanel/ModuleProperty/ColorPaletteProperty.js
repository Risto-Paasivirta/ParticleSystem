import React from "react";
import "./ColorPaletteProperty.css";

const ColorPaletteProperty = (props) => {
  const { value, name, onChange } = props;

  const within256range = (num) => {
    if (num > 255) return 255;
    if (num < 0) return 0;

    return num;
  };

  return (
    <div className="colorPalette-div field">
      <span>{name}</span>
      <div className="colorPalette-nested-div">
        {value.length > 0 && (
          <table className="colorPalette-table">
            <thead>
              <tr>
                <th>r</th>
                <th>g</th>
                <th>b</th>
              </tr>
            </thead>
            <tbody>
              {value.map((color, i) => (
                <tr key={`row-color-${i}`}>
                  <td>
                    <input
                      className="colorPalette-number-field"
                      type="number"
                      value={color.r * 255}
                      min={0}
                      max={255}
                      step={1}
                      onChange={(e) => {
                        let newValue;
                        try {
                          if (e.target.value > 255) e.target.value = 255;
                          if (e.target.value < 0) e.target.value = 0;
                          newValue = Number(e.target.value) / 255;
                        } catch (e) {
                          console.warn(
                            `ColorPaletteProperty could not parse Number`
                          );
                        }
                        const newPropertyValue = [...value];
                        newPropertyValue[i] = {
                          ...newPropertyValue[i],
                          r: newValue,
                        };
                        onChange(newPropertyValue);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      className="colorPalette-number-field"
                      type="number"
                      value={color.g * 255}
                      min={0}
                      max={255}
                      step={1}
                      onChange={(e) => {
                        let newValue;
                        try {
                          newValue =
                            within256range(Number(e.target.value)) / 255;
                        } catch (e) {
                          console.warn(`ColorProperty could not parse Number`);
                        }
                        const newPropertyValue = [...value];
                        newPropertyValue[i] = {
                          ...newPropertyValue[i],
                          g: newValue,
                        };
                        onChange(newPropertyValue);
                      }}
                    ></input>
                  </td>
                  <td>
                    <input
                      className="colorPalette-number-field"
                      type="number"
                      value={color.b * 255}
                      min={0}
                      max={255}
                      step={1}
                      onChange={(e) => {
                        let newValue;
                        try {
                          newValue =
                            within256range(Number(e.target.value)) / 255;
                        } catch (e) {
                          console.warn(`ColorProperty could not parse Number`);
                        }
                        const newPropertyValue = [...value];
                        newPropertyValue[i] = {
                          ...newPropertyValue[i],
                          b: newValue,
                        };
                        onChange(newPropertyValue);
                      }}
                    ></input>
                  </td>
                  <td>
                    <div
                      className="colorPalette-remove-color"
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
          className="colorPalette-add-color"
          onClick={() => {
            const newValue = [...value, { r: 1, g: 1, b: 1 }];
            onChange(newValue);
          }}
        ></div>
      </div>
    </div>
  );
};

export default ColorPaletteProperty;
