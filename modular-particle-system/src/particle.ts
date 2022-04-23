import { Color, Position, Velocity } from "./types";

export class Particle {
    /**
     * Unspecified unit. Depends on separate graphics implementation
     */
    position: Position = { x: 0, y: 0 };
    /**
     * Unspecified units per second. Depends on separate graphics implementation
     */
    velocity: Velocity = { x: 0, y: 0 };
    /**
     * [0, 1]
     */
    color: Color = { r: 1, g: 1, b: 1 };
    /**
     * [0, 1]
     */
    alpha = 1.0;
    /**
     * Radians
     */
    rotation = 0;
    /**
     * Radians per second
     */
    rotationalVelocity = 0;
    /**
     * Seconds
     */
    timeLived = 0;
    /**
     * Seconds
     */
    lifeTime = 2;
    scale = 0.1;
    destroyed = false;
    texture = "";
}
