import { Position } from "types";
import { Triangle } from "./triangle";

/**
 * Library export that compiles all supported _Shapes_.
 *
 * _Shapes_ can be used to describe geometrical areas and boundaries.
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
export const Shapes = {
    /**
     * Create a _Triangle Shape_.
     *
     * Triangle is defined as the area between 3 `Position`s.
     *
     * ```ts
     *  // Example, define a Triangle shape.
     *  const triangle = Shapes.Triangle(
     *      { x: 100, y: 400 },
     *      { x: 300, y: 400 },
     *      { x: 200, y: 0 }
     *  )
     * ```
     *
     * @param   v1  One of the edges of the Triangle in no particular order.
     * @param   v2  One of the edges of the Triangle in no particular order.
     * @param   v3  One of the edges of the Triangle in no particular order.
     * @return      Triangle object.
     */
    Triangle: (v1: Position, v2: Position, v3: Position): Triangle => {
        const triangle = new Triangle();
        triangle.v1 = v1;
        triangle.v2 = v2;
        triangle.v3 = v3;
        return triangle;
    },
};
