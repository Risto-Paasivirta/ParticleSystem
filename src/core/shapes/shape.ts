import { Position } from "core/types";

/**
 * Interface for a Shape object.
 *
 * Defines minimal set of functionalities that a generic Shape must implement to work together with other parts of the library.
 */
export interface Shape {
    /**
     * Get unbiased random position within the Shape.
     * @return      Random position within the Shape.
     */
    getRandomPosition(): Position;
    /**
     * Check whether a position is within the Shape or not.
     * @param   position    Position to check.
     * @return              `true` if `position` is inside the shape, otherwise `false`.
     */
    containsPosition(position: Position): boolean;
}
