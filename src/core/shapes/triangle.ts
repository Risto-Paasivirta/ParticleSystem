import { Position } from "core/types";
import { ShapeLogicImplementation } from "./shape";

export interface Triangle {
    type: "triangle";
    v1: Position;
    v2: Position;
    v3: Position;
}

export const triangleLogic: ShapeLogicImplementation<Triangle> = {
    /**
     * Get unbiased random position within the Shape.
     * @return      Random position within the Shape.
     */
    getRandomPosition(shape: Triangle): Position {
        const r1 = Math.random();
        const r2 = Math.random();

        const s1 = Math.sqrt(r1);

        return {
            x: shape.v1.x * (1.0 - s1) + shape.v2.x * (1.0 - r2) * s1 + shape.v3.x * r2 * s1,
            y: shape.v1.y * (1.0 - s1) + shape.v2.y * (1.0 - r2) * s1 + shape.v3.y * r2 * s1,
        };

        //alternative version that might be faster, something to benchmark for you
        /*
        const s = Math.abs(r1 - r2);
        const t = 0.5 * (r1 + r2 - s);
        const u = 1 - 0.5 * (s + r1 + r2);

        return {
            x: s * shape.v1.x + t * shape.v2.x + u * shape.v3.x,
            y: s * shape.v1.y + t * shape.v2.y + u * shape.v3.y,
        };
        */
    },

    /**
     * Check whether a position is within the Shape or not.
     * @param   position    Position to check.
     * @return              `true` if `position` is inside the shape, otherwise `false`.
     */
    containsPosition(shape: Triangle, position: Position): boolean {
        // Source: https://stackoverflow.com/a/2049593/9288063
        const d1 = sign(position, shape.v1, shape.v2);
        const d2 = sign(position, shape.v2, shape.v3);
        const d3 = sign(position, shape.v3, shape.v1);
        const has_neg = d1 < 0 || d2 < 0 || d3 < 0;
        const has_pos = d1 > 0 || d2 > 0 || d3 > 0;
        return !(has_neg && has_pos);
    },

    /*
    how to get unbiased random point along the edge?

    you must calculate the length of each side and normalize them so each side is a proportion from one
    lets say side1 is 0.3, side2 is 0.2 and side3 is 0.5 after normalization
    then you take a random value between zero and one to see where in edge the randomized point lies
    using inverse linear interpolation (if the random value is between 0.0 and 0.3 it lies somewhere along the side1)
    */
};

/**
 * Internal convenience function used in `containsPosition` implementation.
 *
 * Source: https://stackoverflow.com/a/2049593/9288063
 */
const sign = (p1: Position, p2: Position, p3: Position): number => {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};
