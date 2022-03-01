import { Shape } from "core/shapes/shape";
import { Module } from "../module";
import { ParticleEffect } from "../particleEffect";

/**
 * `Module` that destroys all particles whose center location is outside generic bounds.
 *
 * Bounds must be specified when the module is created and can be modified during run-time with `bounds` property.
 *
 * ```ts
 *  // Example usage
 *  const destructor = new OutsideBoundsDestructor(
 *      particleSystem,
 *      Shapes.Triangle({ x: 100, y: 400 }, { x: 300, y: 400 }, { x: 200, y: 0 }),
 *  );
 * ```
 */
export class OutsideBoundsDestructor extends Module {
    /**
     * Particles outside these bounds are destroyed.
     *
     * Shapes can be selected via `Shapes` export.
     */
    bounds: Shape;

    constructor(particleEffect: ParticleEffect, boundary: Shape) {
        super(particleEffect);
        this.bounds = boundary;
    }

    update(dt: number): void {
        const len = this.particleEffect.particles.length;
        for (let i = 0; i < len; i += 1) {
            const particle = this.particleEffect.particles[i];
            if (!this.bounds.containsPosition(particle.position)) {
                this.particleEffect.destroyParticle(particle);
            }
        }
    }
}
