import { Module } from "../module";

export class Gravity extends Module {
    strength = 0.2;

    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            particle.velocity.y += this.strength;
        });
    }
}
