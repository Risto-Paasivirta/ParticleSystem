import { Position } from "../types";
import { Module } from "../module";
import { Particle } from "../particle";

// NOTE: Ideally we would have a class for `CircleGenerator`, where user could configure whether to generate particles inside the circle or along the exterior.
// `generator.onlyExterior = true` or something like this.

/**
 * Generator module that creates particles along the exterior of a circular area.
 *
 * Each particle is generated next to each other, so that when particles are regularly generated they move around the circle.
 */
export class CircleExteriorGenerator extends Module {
    interval = 0.1;
    private _timer = 0;

    /**
     * Center location of the circle.
     */
    center: Position = { x: 0, y: 0 };
    /**
     * Radius of the circle as pixels.
     */
    radius = 50;
    /**
     * The angle at which the next particle will be generated at.
     *
     * Unit is in _radians_.
     */
    nextParticleAngle = 0;
    /**
     * The angle that is incremented between each generated particle.
     *
     * Unit is in _radians_.
     */
    angleStep = 0.5;

    update(dt: number): void {
        //avoid infinite loop
        if (this.interval <= 0) {
            return;
        }

        this._timer += dt;

        while (this._timer >= this.interval) {
            this._timer -= this.interval;
            this.createParticle();
        }
    }

    createParticle() {
        const particle = new Particle();
        particle.position.x = this.center.x + Math.cos(this.nextParticleAngle) * this.radius;
        particle.position.y = this.center.y + Math.sin(this.nextParticleAngle) * this.radius;
        this.nextParticleAngle += this.angleStep;

        this.parentSystem.addParticle(particle);
    }
}