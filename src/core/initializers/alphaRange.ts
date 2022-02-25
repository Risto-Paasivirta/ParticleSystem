import { Module } from "../module";
import { Particle } from "../particle";
import { Range } from "../types";
import { randomInRange } from "core/utilities";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { moduleToObject, objectToModule, moduleTypeRegistry } from "core/moduleTypeRegistry";

/**
 * Module which overrides `Particle.color.a` property from a configurable random value range.
 *
 * Range can be configured with `alphaRange` property.
 */
export class AlphaRange extends Module {
    /**
     * Should be a number in range [0, 1] where 1 is fully opaque and 0 is completely invisible.
     */
    min = 0;
    /**
     * Should be a number in range [0, 1] where 1 is fully opaque and 0 is completely invisible.
     */
    max = 1;

    init(): void {
        this.active = false; //not used in update

        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.alpha = randomInRange(this.min, this.max);
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return moduleToObject(AlphaRange, ["min", "max"], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): AlphaRange {
        return objectToModule(AlphaRange, ["min", "max"], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "AlphaRange";
}
