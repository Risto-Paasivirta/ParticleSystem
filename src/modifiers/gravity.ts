import { Module } from "../module";

export class Gravity extends Module {
    gravity = 0.2;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            particle.velocity.y += this.gravity;
        });
    }
}
