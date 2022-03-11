import { Module } from "../module";
import { Particle } from "../particle";
import { lerp } from "../utilities";

export class LifeTimeRange extends Module {
    min = 1.5;
    max = 2.5;

    init(): void {
        this.active = false; //not used in update

        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.lifeTime = lerp(this.min, this.max, Math.random());
    };
}
