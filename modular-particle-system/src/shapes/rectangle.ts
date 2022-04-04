import { Position } from "../types";
import { randomInRange } from "../utilities";
import { ShapeLogicImplementation } from "./shape";

export interface Rectangle {
    type: "rectangle";
    v1: Position;
    v2: Position;
}

export const rectangleLogic: ShapeLogicImplementation<Rectangle> = {
    /**
     * Get unbiased random position within the Shape.
     * @return      Random position within the Shape.
     */
    getRandomPosition(shape: Rectangle): Position {
        return {
            x: shape.v1.x + Math.random() * (shape.v2.x - shape.v1.x),
            y: shape.v1.y + Math.random() * (shape.v2.y - shape.v1.y),
        };
    },

    /**
     * Get random position on the Shape edges
     * @returns Random position on the Shape edges
     */
    getRandomEdgePosition: function (shape: Rectangle): Position {
        const width = Math.abs(shape.v1.x - shape.v2.x);
        const height = Math.abs(shape.v1.y - shape.v2.y);
        const edgeLength = width * 2 + height * 2;

        const randomEdgeLength = randomInRange(0, edgeLength);

        // going from bottom left counter-clockwise
        if (randomEdgeLength < height) {
            return {
                x: shape.v1.x,
                y: shape.v1.y + randomEdgeLength,
            };
        } else if (randomEdgeLength < width + height) {
            return {
                x: shape.v1.x + randomEdgeLength - height,
                y: shape.v1.y + height,
            };
        } else if (randomEdgeLength < 2 * height + width) {
            return {
                x: shape.v1.x + width,
                y: shape.v1.y + randomEdgeLength - (height + width),
            };
        } else {
            return {
                x: shape.v1.x + randomEdgeLength - (2 * height + width),
                y: shape.v1.y,
            };
        }
    },

    /**
     * Check whether a position is within the Shape or not.
     * @param   position    Position to check.
     * @return              `true` if `position` is inside the shape, otherwise `false`.
     */
    containsPosition(shape: Rectangle, position: Position): boolean {
        const minX = Math.min(shape.v1.x, shape.v2.x);
        const minY = Math.min(shape.v1.y, shape.v2.y);
        const maxX = Math.max(shape.v1.x, shape.v2.x);
        const maxY = Math.max(shape.v1.y, shape.v2.y);
        return position.x >= minX && position.x <= maxX && position.y >= minY && position.y <= maxY;
    },
};
