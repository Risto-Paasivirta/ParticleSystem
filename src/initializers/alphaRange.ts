import { Module } from "../module";
import { Particle } from "../particle";
import { Range } from "../types";
import { randomInRange } from "../util";

export class AlphaRange extends Module {
    private alphaRange: Range = { min: 0, max: 1 };

    init(): void {
        this.active = false; //not used in update

        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.color.a = randomInRange(this.alphaRange.min, this.alphaRange.max);
    };
}
