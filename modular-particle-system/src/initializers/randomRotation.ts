import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { randomInRange } from "../utilities";

/**
 * Module that assigns a random initial rotation to each particle.
 *
 * @module
 * @category    Initializer
 * min {
 *      @tooltip        Radians
 *      @type           Number
 *      @step           0.785
 *      @defaultValue   0
 * }
 * max {
 *      @tooltip        Radians
 *      @type           Number
 *      @step           0.785
 *      @defaultValue   6.2832
 * }
 */
export class RandomRotation extends Module {
    /**
     * Min rotation as radians.
     */
    min = 0;
    /**
     * Max rotation as radians.
     */
    max = 2 * Math.PI;

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        const angleRad = randomInRange(this.min, this.max);
        particle.rotation = angleRad;
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RandomRotation.moduleTypeId,
            min: this.min,
            max: this.max,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): RandomRotation {
        const module = new RandomRotation(particleEffect);
        loadSerializedProperty(object, RandomRotation, module, "min", deserializePrimitiveDataType, hideWarnings);
        loadSerializedProperty(object, RandomRotation, module, "max", deserializePrimitiveDataType, hideWarnings);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomRotation";
}
