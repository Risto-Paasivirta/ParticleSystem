import { range } from "../Types";
import { Module } from "../Module";
import { Particle } from "../Particle";
import { lerp } from "../Util";

export class RandomVelocity extends Module {
    randomX: range = { min: 100, max: 100 };
    randomY: range = { min: -50, max: 50 };

    init(): void {
        this.parentSystem.addParticleListeners.push(this);
    }

    onAddParticle(particle: Particle): void {
        particle.velocity.x = lerp(this.randomX.min, this.randomX.max, Math.random());
        particle.velocity.y = lerp(this.randomY.min, this.randomY.max, Math.random());
    }
}
