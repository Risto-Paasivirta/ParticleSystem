import { Module } from "../module";
import { Particle } from "../particle";

export class LifeTimeDestructor extends Module {
    _pending: Particle[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(dt: number): void {
        this.parentSystem.particles.forEach((particle) => {
            if (particle.timeLived >= particle.lifeTime) {
                this._pending.push(particle);
            }
        });

        this._pending.forEach((particle) => {
            this.parentSystem.destroyParticle(particle);
        });

        this._pending = [];
    }
}
