import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { randomInRange } from "../utilities";

/**
 * Module which overrides `Particle.color.a` property from a configurable random value range.
 *
 * Range can be configured with `min` and `max` properties.
 *
 * @module
 * @category    Initializer
 * min {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @max            1
 *      @step           0.1
 *      @defaultValue   0
 * }
 * max {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @max            1
 *      @step           0.1
 *      @defaultValue   1
 * }
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

        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.alpha = randomInRange(this.min, this.max);
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: AlphaRange.moduleTypeId,
            min: this.min,
            max: this.max,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): AlphaRange {
        const module = new AlphaRange(particleEffect);
        loadSerializedProperty(object, AlphaRange, module, "min", deserializePrimitiveDataType);
        loadSerializedProperty(object, AlphaRange, module, "max", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "AlphaRange";
}
