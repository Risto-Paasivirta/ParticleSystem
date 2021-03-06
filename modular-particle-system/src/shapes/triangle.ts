import { Position } from "../types";
import { randomInRange, vec2 } from "../utilities";
import { ShapeLogicImplementation } from "./shape";

/**
 * @shape
 * @defaultValue    { "type": "triangle", "v1": { "x": -50, "y": -50 }, "v2": { "x": 0, "y": 50 }, "v3": { "x": 50, "y": -50 } }
 */
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
    /**
     * Get random position on the Shape edges
     * @returns Random position on the Shape edges
     */
    getRandomEdgePosition: function (shape: Triangle): Position {
        const ab = vec2.lengthBetween(shape.v1, shape.v2);
        const bc = vec2.lengthBetween(shape.v2, shape.v3);
        const ac = vec2.lengthBetween(shape.v3, shape.v1);
        const edgeLength = ab + bc + ac;

        const randomEdgeLength = randomInRange(0, edgeLength);

        const positionOnSegment = (
            positionA: Position,
            positionB: Position,
            lengthAB: number,
            lengthAK: number,
        ): Position => {
            const ratio = lengthAK / lengthAB;

            return {
                x: positionA.x + (positionB.x - positionA.x) * ratio,
                y: positionA.y + (positionB.y - positionA.y) * ratio,
            };
        };

        if (randomEdgeLength < ab) {
            return positionOnSegment(shape.v1, shape.v2, ab, randomEdgeLength);
        } else if (randomEdgeLength < ab + bc) {
            return positionOnSegment(shape.v2, shape.v3, bc, randomEdgeLength - ab);
        } else {
            return positionOnSegment(shape.v3, shape.v1, ac, randomEdgeLength - ab - bc);
        }
    },
};

/**
 * Internal convenience function used in `containsPosition` implementation.
 *
 * Source: https://stackoverflow.com/a/2049593/9288063
 */
const sign = (p1: Position, p2: Position, p3: Position): number => {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};
