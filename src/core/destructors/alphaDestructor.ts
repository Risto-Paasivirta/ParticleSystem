import { moduleToObject, objectToModule, moduleTypeRegistry } from "core/moduleTypeRegistry";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { Module } from "../module";
/**
 * `Module` that destroys all particles whose color alpha value is less or equal to 0
 */
export class AlphaDestructor extends Module {
    update(dt: number): void {
        const len = this.parentSystem.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.parentSystem.particles[i];
            if (particle.alpha <= 0) {
                this.parentSystem.destroyParticle(particle);
            }
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return moduleToObject(AlphaDestructor, [], this);
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): AlphaDestructor {
        return objectToModule(AlphaDestructor, [], object, particleSystem);
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "AlphaDestructor";
}
