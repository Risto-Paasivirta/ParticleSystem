import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { ParticleEffect } from "../particleEffect";

/**
 * @module
 * @category    Modifier
 * strength {
 *      @tooltip        TODO
 *      @type           Number
 *      @step           10
 *      @defaultValue   100
 * }
 */
export class Gravity extends Module {
    strength = 100.0;

    update(dt: number): void {
        // pull particles down at a constant speed depending on configured strength.
        this.particleEffect.particles.forEach((particle) => {
            particle.velocity.y += this.strength * dt;
        });
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: Gravity.moduleTypeId,
            strength: this.strength,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): Gravity {
        const module = new Gravity(particleEffect);
        loadSerializedProperty(object, Gravity, module, "strength", deserializePrimitiveDataType, hideWarnings);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "Gravity";
}
