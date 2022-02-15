import { Color, Position, Velocity } from "./types";

export class Particle {
    position: Position = { x: 0, y: 0 };
    velocity: Velocity = { x: 0, y: 0 };
    color: Color = { r: 1, g: 1, b: 1, a: 1 };
    rotation = 0;
    timeLived = 0;
    lifeTime = 2;
    scale = 0.1;
    destroyed = false;
}
