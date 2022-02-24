import { Range } from "../types";
import { Module } from "../module";
import { Particle } from "../particle";
import { lerp } from "core/utilities";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { moduleToObject, moduleTypeRegistry, objectToModule } from "core/moduleTypeRegistry";

export class RandomVelocity extends Module {
    randomX: Range = { min: 100, max: 100 };
    randomY: Range = { min: -50, max: 50 };

    init(): void {
        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
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
        return moduleToObject(RandomVelocity, ["randomX", "randomY"], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): RandomVelocity {
        return objectToModule(RandomVelocity, ["randomX", "randomY"], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RandomVelocity";
}

/**
 * Include the Module in a registry containing all Module types in the library.
 *
 * This is necessary for loading modules from objects.
 */
moduleTypeRegistry.push(RandomVelocity);
