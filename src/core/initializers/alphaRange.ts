import { Module } from "../module";
import { Particle } from "../particle";
import { Range } from "../types";
import { randomInRange } from "core/utilities";

/**
 * Module which overrides `Particle.color.a` property from a configurable random value range.
 *
 * Range can be configured with `alphaRange` property.
 */
export class AlphaRange extends Module {
    /**
     * Value ranges for `Particle.color.a`.
     *
     * Should be a number in range [0, 1] where 1 is fully opaque and 0 is completely invisible.
     */
    alphaRange: Range = { min: 0, max: 1 };

    init(): void {
        this.active = false; //not used in update

        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.alpha = randomInRange(this.alphaRange.min, this.alphaRange.max);
    };
}
