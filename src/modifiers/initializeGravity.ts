import { Module } from "../Module";
import { Particle } from "../Particle";

export class InitializeGravity extends Module {
    gravity = 2;
    modifier = 0.1;

    init(): void {
        this.parentSystem.addParticleListeners.push(this);
    }

    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            particle.velocity.y += this.modifier * this.gravity;
        });
    }

    onAddParticle(particle: Particle): void {
        particle.velocity.y = this.gravity;
    }
}
