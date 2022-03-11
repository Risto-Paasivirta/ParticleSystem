import { Module, ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { lerp } from "../utilities";

export class LifeTimeRange extends Module {
    min = 1.5;
    max = 2.5;

    init(): void {
        this.active = false; //not used in update

        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        particle.lifeTime = lerp(this.min, this.max, Math.random());
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: LifeTimeRange.moduleTypeId,
            min: this.min,
            max: this.max,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): LifeTimeRange {
        const module = new LifeTimeRange(particleEffect);
        loadSerializedProperty(object, LifeTimeRange, module, "min", deserializePrimitiveDataType);
        loadSerializedProperty(object, LifeTimeRange, module, "max", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "LifeTimeRange";
}
