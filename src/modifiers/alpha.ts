import { Module } from "../module";

export class Alpha extends Module {
    ratio = 0.01;

    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            particle.color.a -= Math.random() * this.ratio;
        });
    }
}
