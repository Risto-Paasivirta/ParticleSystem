import { Position } from "../types";
import { randomInRange, vec2 } from "../utilities";
import { ShapeLogicImplementation } from "./shape";

/**
 * @shape
 * @defaultValue    { "type": "circle", "center": { "x": 0, "y": 0 }, "radius": 50 }
 */
export interface Circle {
    type: "circle";
    center: Position;
    radius: number;
}

export const circleLogic: ShapeLogicImplementation<Circle> = {
    /**
     * Get unbiased random position within the Shape.
     * @return      Random position within the Shape.
     */
    getRandomPosition(shape: Circle): Position {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * shape.radius;
        return {
            x: shape.center.x + Math.cos(angle) * radius,
            y: shape.center.y + Math.sin(angle) * radius,
        };
    },

    /**
     * Get random position on the Shape edges
     * @returns Random position on the Shape edges
     */
    getRandomEdgePosition: function (shape: Circle): Position {
        const angle = Math.random() * 2 * Math.PI;
        const radius = shape.radius;
        return {
            x: shape.center.x + Math.cos(angle) * radius,
            y: shape.center.y + Math.sin(angle) * radius,
        };
    },

    /**
     * Check whether a position is within the Shape or not.
     * @param   position    Position to check.
     * @return              `true` if `position` is inside the shape, otherwise `false`.
     */
    containsPosition(shape: Circle, position: Position): boolean {
        const distFromCenter = vec2.length(vec2.subtract(position, shape.center));
        return distFromCenter <= shape.radius;
    },
};
