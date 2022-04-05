import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { lerp } from "../utilities";
import { Range } from "../types";

/**
 * @module
 * @category    Initializer
 * randomX {
 *      @tooltip        TODO
 *      @type           Range
 * }
 * randomY {
 *      @tooltip        TODO
 *      @type           Range
 * }
 */
export class RandomVelocity extends Module {
    randomX: Range = { min: 100, max: 100 };
    randomY: Range = { min: -50, max: 50 };

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.velocity.x = lerp(this.randomX.min, this.randomX.max, Math.random());
        particle.velocity.y = lerp(this.randomY.min, this.randomY.max, Math.random());
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RandomVelocity.moduleTypeId,
            randomX: this.randomX,
            randomY: this.randomY,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): RandomVelocity {
        const module = new RandomVelocity(particleEffect);
        loadSerializedProperty(object, RandomVelocity, module, "randomX", deserializePrimitiveDataType, hideWarnings);
        loadSerializedProperty(object, RandomVelocity, module, "randomY", deserializePrimitiveDataType, hideWarnings);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomVelocity";
}
