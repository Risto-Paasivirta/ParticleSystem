import { Module } from "../Module";
import { Particle } from "../Particle";

export class initializeGravity extends Module {
    gravity = 50;
    onAir: boolean = false;

    init(): void {
        this.parentSystem.addParticleListeners.push(this);
    }

    onAddParticle(particle: Particle): void {
        if (this.onAir = false) {
            particle.velocity.y = this.gravity;
        }
    }
}
