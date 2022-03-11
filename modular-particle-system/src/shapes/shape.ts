import { Position } from "../types";
import { Triangle, triangleLogic } from "./triangle";

export type Shape = Triangle;

export const serializeShape = (shape: Shape): unknown => {
    // Shapes are just primitive data types, can be serialized as they are.
    return shape;
};

export const deserializeShape = (serializedShape: unknown): Shape | undefined => {
    // Shapes are just primitive data types, can be deserialized as they are.
    return serializedShape as Shape;
};

export const getRandomPositionInsideShape = (shape: Shape): Position => {
    return selectShapeLogic(shape).getRandomPosition(shape);
};

export const shapeContainsPosition = (shape: Shape, position: Position): boolean => {
    return selectShapeLogic(shape).containsPosition(shape, position);
};

const selectShapeLogic = (shape: Shape): ShapeLogicImplementation<Shape> => {
    switch (shape.type) {
        case "triangle":
            return triangleLogic;
    }
    throw new Error(`Unidentified shape ${shape.type}`);
};

/**
 * Interface for describing the implementation of a single shape.
 *
 * Each shape in the library should be able to accomplish same purposes than all other shapes, for example currently:
 * - Finding a random position inside the shape.
 * - Checking if a position is inside the shape.
 *
 * The logic is intentionally kept separate from the data structure of a shape for simplifying serialization
 * (shape data structure can be serialized as is as long as it doesn't contain any logic)
 */
export interface ShapeLogicImplementation<ShapeType> {
    /**
     * Get unbiased random position within the Shape.
     * @return      Random position within the Shape.
     */
    getRandomPosition(shape: ShapeType): Position;

    /**
     * Check whether a position is within the Shape or not.
     * @param   position    Position to check.
     * @return              `true` if `position` is inside the shape, otherwise `false`.
     */
    containsPosition(shape: ShapeType, position: Position): boolean;
}
