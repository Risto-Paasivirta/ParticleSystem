import { Range } from "../types";
import { Module } from "../module";
import { Particle } from "../particle";
import { randomInRange } from "utilities";

/**
 * Module that assigns a random angular velocity to each particle.
 *
 * Angular velocity means selecting a random angle [0, 360] deg,
 * and then randomizing a velocity along that direction.
 */
export class RandomAngleVelocity extends Module {
    /**
     * Configure random range of velocities.
     */
    velocityRange: Range = { min: 0, max: 100 };

    init(): void {
        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        const angleRad = Math.random() * 2 * Math.PI;
        const velocity = randomInRange(this.velocityRange.min, this.velocityRange.max);
        particle.velocity.x = Math.cos(angleRad) * velocity;
        particle.velocity.y = Math.sin(angleRad) * velocity;
    };
}
