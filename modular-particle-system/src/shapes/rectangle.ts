import { Position } from "../types";
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
        const side = Math.round(Math.random() * 4);
        /*   _____1______
			|			|
		  0 |			| 2
			|_____3_____|
		*/
        switch (side) {
            case 0:
                return {
                    x: shape.v1.x,
                    y: shape.v1.y + Math.random() * (shape.v2.y - shape.v1.y),
                };
            case 1:
                return {
                    x: shape.v1.x + Math.random() * (shape.v2.x - shape.v1.x),
                    y: shape.v1.y,
                };
            case 2:
                return {
                    x: shape.v2.x,
                    y: shape.v1.y + Math.random() * (shape.v2.y - shape.v1.y),
                };
            case 3:
                return {
                    x: shape.v1.x + Math.random() * (shape.v2.x - shape.v1.x),
                    y: shape.v2.y,
                };
            default:
                return {
                    x: shape.v1.x,
                    y: shape.v1.y + Math.random() * (shape.v2.y - shape.v1.y),
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
