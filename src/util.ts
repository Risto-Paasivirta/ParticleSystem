import { Position } from "types";

export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
export const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
export const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
export const range = (x1: number, y1: number, x2: number, y2: number, a: number) => lerp(x2, y2, invlerp(x1, y1, a));

/**
 * Get random number between range [min, max].
 * @param min
 * @param max
 * @returns
 */
export const randomInRange = (min: number, max: number): number => min + Math.random() * (max - min);

/**
 * Collection of utilities for `{ x: number, y: number }` data structures.
 */
export const vec2 = {
    /**
     * Subtract two vectors.
     * @param a     Vector
     * @param b     Position
     * @return      `{ x: a.x - b.x, y: a.y - b.x }`
     */
    subtract: (a: Position, b: Position): Position => {
        return { x: a.x - b.x, y: a.y - b.y };
    },
    /**
     * Multiply vector with a number.
     * @param a     Vector
     * @param b     Number
     * @return      `{ x: a.x * b, y: a.y * b }`
     */
    multiply: (a: Position, b: number): Position => {
        return { x: a.x * b, y: a.y * b };
    },
};
