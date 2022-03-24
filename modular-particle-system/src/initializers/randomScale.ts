import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { lerp } from "../utilities";

/**
 * Module that assigns a random scale to each particle upon its creation.
 *
 * Scale range can be customized with properties: `min` and `max`.
 *
 * @moduleProperties
 * min {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @step           0.1
 *      @defaultValue   0.5
 * }
 * max {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @step           0.1
 *      @defaultValue   1.5
 * }
 */
export class RandomScale extends Module {
    min = 0.5;
    max = 1.5;

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
        this.active = false;
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.scale = lerp(this.min, this.max, Math.random());
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RandomScale.moduleTypeId,
            min: this.min,
            max: this.max,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): RandomScale {
        const module = new RandomScale(particleEffect);
        loadSerializedProperty(object, RandomScale, module, "min", deserializePrimitiveDataType);
        loadSerializedProperty(object, RandomScale, module, "max", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomScale";
}
