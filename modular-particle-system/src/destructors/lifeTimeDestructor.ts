import { Module, ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";

/**
 * @module
 * @category    Destructor
 */
export class LifeTimeDestructor extends Module {
    update(dt: number): void {
        const len = this.particleEffect.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.particleEffect.particles[i];
            if (particle.timeLived >= particle.lifeTime) {
                this.particleEffect.destroyParticle(particle);
            }
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: LifeTimeDestructor.moduleTypeId,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): LifeTimeDestructor {
        const module = new LifeTimeDestructor(particleEffect);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "LifeTimeDestructor";
}
