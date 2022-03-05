import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { MixBlend } from "pixi-spine";

// NOTE: Ideally we would have a class for `CircleGenerator`, where user could configure whether to generate particles inside the circle or along the exterior.
// `generator.onlyExterior = true` or something like this.

/**
 * Generator module that creates particles along the exterior of a circular area.
 *
 * Each particle is generated next to each other, so that when particles are regularly generated they move around the circle.
 */
export class CircleEdgeGenerator extends ParticleGenerator {
    /**
     * Center position of the circle.
     */
    center: Position = { x: 0, y: 0 };
    /**
     * Max Radius of the circle as pixels.
     */
    outerRadius = 50;
    /**
     * /**
     * Min Radius of the circle as pixels.
     */
    innerRadius = 40;

    generateParticle(): void {
        const particle = new Particle();
        const nextParticleAngle = Math.random() * Math.PI * 2;
        /**
         * Sphere is the distance between two radius as pixels
         */
        const sphere = Math.random() * (this.outerRadius - this.innerRadius) + this.innerRadius;

        particle.position.x = this.center.x + Math.cos(nextParticleAngle) * sphere;
        particle.position.y = this.center.y + Math.sin(nextParticleAngle) * sphere;
        this.parentSystem.addParticle(particle);
    }
}
