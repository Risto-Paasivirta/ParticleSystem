import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { ParticleEffect } from "../particleEffect";

export class Gravity extends Module {
    strength = 0.2;

    update(dt: number): void {
        this.particleEffect.particles.forEach((particle) => {
            particle.velocity.y += this.strength;
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

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): Gravity {
        const module = new Gravity(particleEffect);
        loadSerializedProperty(object, Gravity, module, "strength", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "Gravity";
}
