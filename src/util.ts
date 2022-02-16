import { Color } from "types";

export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
export const range = (x1: number, y1: number, x2: number, y2: number, a: number) => lerp(x2, y2, invlerp(x1, y1, a));

/**
 * Interpolate between two colors.
 *
 * The color interpolation is done linearly in LAB color space.
 *
 * @param   a       Color 1.
 * @param   b       Color 2.
 * @param   factor  Ratio between colors 1 and 2 that will be used for the returned color.
 * @returns         Interpolated Color.
 */
export const lerpColor = (a: Color, b: Color, factor: number): Color => {
    const aLab = rgbToLab(a);
    const bLab = rgbToLab(b);
    const lerpLab: ColorLAB = {
        l: lerp(aLab.l, bLab.l, factor),
        a: lerp(aLab.a, bLab.a, factor),
        b: lerp(aLab.b, bLab.b, factor),
    };
    const lerbRGB = labToRgb(lerpLab);
    const lerpA = lerp(a.a, b.a, factor);
    return {
        r: lerbRGB.r,
        g: lerbRGB.g,
        b: lerbRGB.b,
        a: lerpA,
    };
};

/**
 * Type for RGB color.
 */
type ColorRGB = {
    /**
     * Red color value in range [0, 1]
     */
    r: number;
    /**
     * Green color value in range [0, 1]
     */
    g: number;
    /**
     * Blue color value in range [0, 1]
     */
    b: number;
};

/**
 * Type for Color in LAB color space.
 *
 * In simple terms, LAB color space represents colors as combinations of numeric values which are better recognized by human eye.
 *
 * Interpolation of colors in LAB color space gives much more pleasant looking results than RGB or other common color spaces.
 *
 * https://en.wikipedia.org/wiki/CIELAB_color_space
 */
type ColorLAB = {
    l: number;
    a: number;
    b: number;
};

/**
 * Function that transforms a RGB color to LAB.
 */
const rgbToLab = (rgb: ColorRGB): ColorLAB => {
    // Source: https://github.com/calibr/rgb-lab/blob/master/color.js
    let r = rgb.r,
        g = rgb.g,
        b = rgb.b,
        x,
        y,
        z;

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    return { l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
};

/**
 * Function that transforms a LAB color to RGB.
 */
const labToRgb = (lab: ColorLAB): ColorRGB => {
    // Source: https://github.com/calibr/rgb-lab/blob/master/color.js
    let y = (lab.l + 16) / 116,
        x = lab.a / 500 + y,
        z = y - lab.b / 200,
        r,
        g,
        b;

    x = 0.95047 * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787);
    y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787);
    z = 1.08883 * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787);

    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;

    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

    return {
        r: Math.max(0, Math.min(1, r)),
        g: Math.max(0, Math.min(1, g)),
        b: Math.max(0, Math.min(1, b)),
    };
};
