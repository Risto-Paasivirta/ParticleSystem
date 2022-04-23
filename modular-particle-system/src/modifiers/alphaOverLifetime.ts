import { deserializeEasing, EasingFunction, EasingFunctions, serializeEasing } from "../easing";
import { loadSerializedProperty } from "../serialization/moduleSerialization";
import { clamp } from "../utilities";
import { Module, ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";
import { Particle } from "../particle";

type ParticleWithInitialAlpha = Particle & {
    /**
     * Saved initial alpha of particle. This is cached when particle is added.
     */
    _alphaOverLifetime_initialAlpha?: number;
};

/**
 * Module that decays particles alpha over their lifetime.
 *
 * Alpha animation can be customized with `easing` property.
 *
 * This module modifies `Particle.alpha` property and can not be combined with any other modifier that does so.
 * It can however be combined with modules that alter the alpha during initialization, but these modules must be defined before `AlphaOverLifetime`!
 *
 * @module
 * @category    Modifier
 * easing {
 *      @tooltip        TODO
 *      @type           EasingFunction
 *      @defaultValue   easeOutSine
 * }
 */
export class AlphaOverLifetime extends Module {
    /**
     * Easing function that controls the animation of alpha.
     *
     * Assign via `EasingFunctions` export.
     */
    easing: EasingFunction = EasingFunctions.easeOutSine;

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: ParticleWithInitialAlpha): void => {
        particle._alphaOverLifetime_initialAlpha = particle.alpha;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        const particles = this.particleEffect.particles;
        const len = particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = particles[i] as ParticleWithInitialAlpha;
            const initialAlpha = particle._alphaOverLifetime_initialAlpha as number;
            const alpha =
                initialAlpha - initialAlpha * this.easing(clamp(particle.timeLived / particle.lifeTime, 0, 1));
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

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): AlphaOverLifetime {
        const module = new AlphaOverLifetime(particleEffect);
        loadSerializedProperty(object, AlphaOverLifetime, module, "easing", deserializeEasing, hideWarnings);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "AlphaOverLifetime";
}
