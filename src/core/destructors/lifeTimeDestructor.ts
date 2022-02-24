import { moduleToObject, moduleTypeRegistry, objectToModule } from "core/moduleTypeRegistry";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { Module } from "../module";

export class LifeTimeDestructor extends Module {
    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (particle.timeLived >= particle.lifeTime) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return moduleToObject(LifeTimeDestructor, [], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): LifeTimeDestructor {
        return objectToModule(LifeTimeDestructor, [], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "LifeTimeDestructor";
}

/**
 * Include the Module in a registry containing all Module types in the library.
 *
 * This is necessary for loading modules from objects.
 */
moduleTypeRegistry.push(LifeTimeDestructor);
