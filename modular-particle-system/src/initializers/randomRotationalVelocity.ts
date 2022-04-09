import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { lerp } from "../utilities";

/**
 * Module that assigns each particle random _rotational velocity_.
 * This causes the particle to continuously rotate with a static speed along its lifetime.
 *
 * Rotational velocity range can be customized with `min` and `max` properties.
 *
 * @module
 * @category    Initializer
 * min {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           0.25
 *      @defaultValue   -5.0
 * }
 * max {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           0.25
 *      @defaultValue   5.0
 * }
 */
export class RandomRotationalVelocity extends Module {
    /**
     * Min rotational velocity as **Radians per second**
     */
    min = -2 * Math.PI;
    /**
     * Max rotational velocity as **Radians per second**
     */
    max = 2 * Math.PI;

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
        this.active = false;
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.rotationalVelocity = lerp(this.min, this.max, Math.random());
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RandomRotationalVelocity.moduleTypeId,
            min: this.min,
            max: this.max,
        };
    }

    static fromObject(
        particleEffect: ParticleEffect,
        object: ModuleObject,
        hideWarnings: boolean,
    ): RandomRotationalVelocity {
        const module = new RandomRotationalVelocity(particleEffect);
        loadSerializedProperty(
            object,
            RandomRotationalVelocity,
            module,
            "min",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            RandomRotationalVelocity,
            module,
            "max",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomRotationalVelocity";
}
