import { Module } from "../module";
import { Particle } from "../particle";
import { randomInRange } from "../utilities";

/**
 * Module that assigns a random velocity to each particle along a random direction.
 */
export class RandomAngleVelocity extends Module {
    /**
     * Minimum velocity
     */
    min = 0;
    /**
     * Maximum velocity
     */
    max = 100;

    init(): void {
        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        const angleRad = Math.random() * 2 * Math.PI;
        const velocity = randomInRange(this.min, this.max);
        particle.velocity.x = Math.cos(angleRad) * velocity;
        particle.velocity.y = Math.sin(angleRad) * velocity;
    };
}
