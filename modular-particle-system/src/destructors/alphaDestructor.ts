import { Module, ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";

/**
 * `Module` that destroys all particles whose color alpha value is less or equal to 0
 */
export class AlphaDestructor extends Module {
    update(dt: number): void {
        const len = this.particleEffect.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.particleEffect.particles[i];
            if (particle.alpha <= 0) {
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
            moduleTypeId: AlphaDestructor.moduleTypeId,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): AlphaDestructor {
        const module = new AlphaDestructor(particleEffect);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "AlphaDestructor";
}
