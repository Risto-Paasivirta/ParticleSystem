import { deserializeEasing, EasingFunction, EasingFunctions, serializeEasing } from "core/easing";
import { loadSerializedProperty } from "core/moduleSerialization";
import { ModuleObject, ParticleSystem } from "core/particleSystem";
import { clamp } from "core/utilities";
import { Module } from "../module";

/**
 * Module that decays particles alpha over their lifetime.
 *
 * Alpha animation can be customized with `easing` property.
 *
 * This module modifies `Particle.alpha` property and can not be combined with any other modifier that does so.
 */
export class AlphaOverLifetime extends Module {
    /**
     * Easing function that controls the animation of alpha.
     *
     * Assign via `EasingFunctions` export.
     */
    easing: EasingFunction = EasingFunctions.easeOutSine;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        const particles = this.parentSystem.particles;
        const len = particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = particles[i];
            const alpha = 1 - this.easing(clamp(particle.timeLived / particle.lifeTime, 0, 1));
            particle.alpha = alpha;
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: AlphaOverLifetime.moduleTypeId,
            easing: serializeEasing(this.easing),
        };
    }

    static fromObject(particleSystem: ParticleSystem, object: ModuleObject): AlphaOverLifetime {
        const module = new AlphaOverLifetime(particleSystem);
        loadSerializedProperty(object, AlphaOverLifetime, module, "easing", deserializeEasing);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "AlphaOverLifetime";
}
