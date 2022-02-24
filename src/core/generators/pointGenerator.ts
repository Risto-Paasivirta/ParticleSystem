import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";

export class PointGenerator extends ParticleGenerator {
    position: Position = { x: 0, y: 0 };

    generateParticle() {
        const particle = new Particle();
        particle.position.x = this.position.x;
        particle.position.y = this.position.y;

        this.parentSystem.addParticle(particle);
    }
}
