import { Position } from "Types";
import { Shape } from "./shape";

/**
 * Triangle _Shape_.
 *
 * Triangles can be created via `Shapes` export.
 *
 * ```ts
 *  // Example, define a Triangle shape.
 *  const triangle = Shapes.Triangle(
 *      { x: 100, y: 400 },
 *      { x: 300, y: 400 },
 *      { x: 200, y: 0 }
 *  )
 * ```
 */
export class Triangle implements Shape {
    v1: Position = { x: 0, y: 0 };
    v2: Position = { x: 0, y: 0 };
    v3: Position = { x: 0, y: 0 };

    /**
     * Get unbiased random position within the Shape.
     * @return      Random position within the Shape.
     */
    getRandomPosition(): Position {
        const r1 = Math.random();
        const r2 = Math.random();

        const s1 = Math.sqrt(r1);

        return {
            x: this.v1.x * (1.0 - s1) + this.v2.x * (1.0 - r2) * s1 + this.v3.x * r2 * s1,
            y: this.v1.y * (1.0 - s1) + this.v2.y * (1.0 - r2) * s1 + this.v3.y * r2 * s1,
        };

        //alternative version that might be faster, something to benchmark for you
        /*
        const s = Math.abs(r1 - r2);
        const t = 0.5 * (r1 + r2 - s);
        const u = 1 - 0.5 * (s + r1 + r2);

        return {
            x: s * this.v1.x + t * this.v2.x + u * this.v3.x,
            y: s * this.v1.y + t * this.v2.y + u * this.v3.y,
        };
        */
    }

    /**
     * Check whether a position is within the Shape or not.
     * @param   position    Position to check.
     * @return              `true` if `position` is inside the shape, otherwise `false`.
     */
    containsPosition(position: Position): boolean {
        // Source: https://stackoverflow.com/a/2049593/9288063
        const d1 = this.sign(position, this.v1, this.v2);
        const d2 = this.sign(position, this.v2, this.v3);
        const d3 = this.sign(position, this.v3, this.v1);
        const has_neg = d1 < 0 || d2 < 0 || d3 < 0;
        const has_pos = d1 > 0 || d2 > 0 || d3 > 0;
        return !(has_neg && has_pos);
    }

    /**
     * Internal convenience function used in `containsPosition` implementation.
     *
     * Source: https://stackoverflow.com/a/2049593/9288063
     */
    protected sign(p1: Position, p2: Position, p3: Position): number {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    /*
    how to get unbiased random point along the edge?

    you must calculate the length of each side and normalize them so each side is a proportion from one
    lets say side1 is 0.3, side2 is 0.2 and side3 is 0.5 after normalization
    then you take a random value between zero and one to see where in edge the randomized point lies
    using inverse linear interpolation (if the random value is between 0.0 and 0.3 it lies somewhere along the side1)
    */
}
