import { Module } from "../Module";
import { Particle } from "../Particle";
import { range } from "../Types";
import { lerp } from "../Util";

export class LifeTimeRange extends Module {
    lifetime: range = { min: 1.5, max: 2.5 };

    init(): void {
        this.active = false; //not used in update

        this.parentSystem.addParticleListeners.push(this);
    }

    onAddParticle(particle: Particle): void {
        particle.lifeTime = lerp(this.lifetime.min, this.lifetime.max, Math.random());
    }
}
