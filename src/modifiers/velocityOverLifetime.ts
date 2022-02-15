import { EasingFunction, EasingFunctions } from "easing";
import { Particle } from "particle";
import { Velocity } from "types";
import { vec2 } from "../util";
import { Module } from "../module";

type ParticleWithInitialVelocity = Particle & {
    // TODO: In production these property names should be minimized for performance !
    /**
     * Saved initial velocity of particle. This is cached when particle is added.
     */
    _velocityOverLifetime_initialVelocity?: Velocity;
};

/**
 * Module that decays particle velocity over its lifetime.
 *
 * For working properly, you should ensure that the module that initializes particle velocity is listed BEFORE this module!
 *
 * Velocity animation can be customized with `easign` property.
 */
export class VelocityOverLifetime extends Module {
    /**
     * Easing function that controls the animation of velocity.
     *
     * Assign via `EasingFunctions` export.
     */
    easing: EasingFunction = EasingFunctions.easeOutSine;

    init(): void {
        this.parentSystem.addParticleListeners.push(this.handleParticleAdd);
    }

    handleParticleAdd = (particle: ParticleWithInitialVelocity): void => {
        particle._velocityOverLifetime_initialVelocity = particle.velocity;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        const particles = this.parentSystem.particles;
        const len = particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = particles[i] as ParticleWithInitialVelocity;
            const x = particle.timeLived / particle.lifeTime;
            const initialVelocity = particle._velocityOverLifetime_initialVelocity as Velocity;
            particle.velocity = vec2.mul(initialVelocity, 1 - this.easing(x));
        }
    }
}
