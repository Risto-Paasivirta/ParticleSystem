import { Module } from "../module";

export abstract class ParticleGenerator extends Module {
    /**
     * Interval between generated particles as milliseconds
     * (as long as `Generator.active === true`)
     */
    interval = 0.1;

    private _timer = 0;

    update(dt: number): void {
        if (this.interval <= 0) {
            return;
        }

        this._timer += dt;

        while (this._timer >= this.interval) {
            this._timer -= this.interval;
            this.generateParticle();
        }
    }

    /**
     * Function that can be used to generate a single particle.
     */
    abstract generateParticle(): void;
}
