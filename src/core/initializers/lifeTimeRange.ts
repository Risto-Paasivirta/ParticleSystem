import { Module } from "../module";
import { Particle } from "../particle";
import { lerp } from "core/utilities";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { loadSerializedProperty, deserializePrimitiveDataType } from "core/moduleSerialization";

export class LifeTimeRange extends Module {
    min = 1.5;
    max = 2.5;

    init(): void {
        this.active = false; //not used in update

        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
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

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): LifeTimeRange {
        const module = new LifeTimeRange(particleSystem);
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
