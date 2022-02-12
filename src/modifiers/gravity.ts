import { Module } from "../module";

export class Gravity extends Module {
    gravity = 2;
    modifier = 0.1;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            particle.velocity.y += this.modifier * this.gravity;
        });
    }
}
