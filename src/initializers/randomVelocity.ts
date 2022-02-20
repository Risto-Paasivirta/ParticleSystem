import { Range } from "../types";
import { Module } from "../module";
import { Particle } from "../particle";
import { lerp } from "../util";

export class RandomVelocity extends Module {
    randomX: Range = { min: 100, max: 100 };
    randomY: Range = { min: -50, max: 50 };

    init(): void {
        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.velocity.x = lerp(this.randomX.min, this.randomX.max, Math.random());
        particle.velocity.y = lerp(this.randomY.min, this.randomY.max, Math.random());
    };
}
