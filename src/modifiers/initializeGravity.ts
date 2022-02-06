import { Module } from "../Module";
import { Particle } from "../Particle";

export class initializeGravity extends Module {
    init(): void {
        this.parentSystem.addParticleListeners.push(this);
    }

    onAddParticle(particle: Particle): void {
        particle.velocity.y = 50;
    }
}
