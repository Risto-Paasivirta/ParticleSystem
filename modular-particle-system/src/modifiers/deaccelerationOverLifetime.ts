import { EasingFunction, EasingFunctions, deserializeEasing } from "../easing";
import { Module, ModuleObject } from "../module";
import { loadSerializedProperty } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { Velocity } from "../types";
import { vec2 } from "../utilities";

type ParticleWithInitialVelocity = Particle & {
    // TODO: In production these property names should be minimized for performance !
    /**
     * Saved initial velocity of particle. This is cached when particle is added.
     */
    _velocityOverLifetime_initialVelocity?: Velocity;
};

/**
 * Module that deaccelerates particle velocity over its lifetime.
 *
 * The direction of the deacceleration is based on the initial velocity of each particle.
 * For this reason, you should ensure that the module that initializes particle velocity is listed BEFORE this module!
 *
 * Deacceleration animation can be customized with `easing` property.
 *
 * This module modifies `Particle.velocity` property, but does not reassign it so this can be combined with other modules which affect particle velocity.
 *
 * @module
 * @category    Modifier
 * easing {
 *      @tooltip        TODO
 *      @type           EasingFunction
 * }
 */
export class DeaccelerationOverLifetime extends Module {
    /**
     * Easing function that controls the animation of velocity.
     *
     * Assign via `EasingFunctions` export.
     */
    easing: EasingFunction = EasingFunctions.easeOutSine;

    init(): void {
        this.particleEffect.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: ParticleWithInitialVelocity): void => {
        particle._velocityOverLifetime_initialVelocity = {
            x: particle.velocity.x,
            y: particle.velocity.y,
        };
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        const particles = this.particleEffect.particles;
        const len = particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = particles[i] as ParticleWithInitialVelocity;
            // NOTE: Velocity difference for each frame is calculated to avoid completely reassigning particle velocity.
            // This is great because it allows combining deacceleration module with other velocity affecting modules.
            const xPrev = (particle.timeLived - dt) / particle.lifeTime;
            const xNow = particle.timeLived / particle.lifeTime;
            const animationPrev = this.easing(xPrev);
            const animationNow = this.easing(xNow);
            const initialVelocity = particle._velocityOverLifetime_initialVelocity as Velocity;
            const deacceleration = vec2.multiply(initialVelocity, animationNow - animationPrev);
            particle.velocity.x -= deacceleration.x;
            particle.velocity.y -= deacceleration.y;
        }
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: DeaccelerationOverLifetime.moduleTypeId,
            easing: deserializeEasing(this.easing),
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): DeaccelerationOverLifetime {
        const module = new DeaccelerationOverLifetime(particleEffect);
        loadSerializedProperty(object, DeaccelerationOverLifetime, module, "easing", deserializeEasing);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "DeaccelerationOverLifetime";
}
