import { color, position, velocity } from "./Types";

export class Particle {
    position: position = { x: 0, y: 0 };
    velocity: velocity = { x: 0, y: 0 };
    color: color = { r: 1, g: 1, b: 1, a: 1 };
    rotation = 0;
    timeLived = 0;
    lifeTime = 2;
}
