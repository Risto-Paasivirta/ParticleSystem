import { Module } from "../module";
import { Particle } from "../particle";
import { Range } from "../types";
import { lerp } from "core/utilities";

export class LifeTimeRange extends Module {
    lifetime: Range = { min: 1.5, max: 2.5 };

    init(): void {
        this.active = false; //not used in update

        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.lifeTime = lerp(this.lifetime.min, this.lifetime.max, Math.random());
    };
}
