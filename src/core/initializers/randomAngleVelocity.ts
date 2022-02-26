import { Module } from "../module";
import { Particle } from "../particle";
import { randomInRange } from "core/utilities";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { deserializePrimitiveDataType, loadSerializedProperty } from "core/moduleSerialization";

/**
 * Module that assigns a random velocity to each particle along a random direction.
 */
export class RandomAngleVelocity extends Module {
    /**
     * Minimum velocity
     */
    min = 0;
    /**
     * Maximum velocity
     */
    max = 100;

    init(): void {
        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: Particle): void => {
        const angleRad = Math.random() * 2 * Math.PI;
        const velocity = randomInRange(this.min, this.max);
        particle.velocity.x = Math.cos(angleRad) * velocity;
        particle.velocity.y = Math.sin(angleRad) * velocity;
    };

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RandomAngleVelocity.moduleTypeId,
            min: this.min,
            max: this.max,
        };
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): RandomAngleVelocity {
        const module = new RandomAngleVelocity(particleSystem);
        loadSerializedProperty(object, RandomAngleVelocity, module, "min", deserializePrimitiveDataType);
        loadSerializedProperty(object, RandomAngleVelocity, module, "max", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomAngleVelocity";
}
