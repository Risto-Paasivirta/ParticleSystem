import { Module } from "../module";

export abstract class ParticleGenerator extends Module {
    /**
     * Interval between generated particles as milliseconds
     * (as long as `Generator.active === true`)
     */
    interval = 0.1;
    private _timer = 0;

    /**
     * List of timestamps when a batch of particles can be generated.
     *
     * `time` is seconds since the particle effect was created,
     * and `count` is number of particles to generate.
     */
    bursts: Array<{ time: number; count: number }> = [];
    private _updateCounter = 0;

    update(dt: number): void {
        const tPrev = this._updateCounter;
        const tNow = this._updateCounter + dt;
        // Trigger all bursts that are between tPrev and tNow
        this.bursts.forEach((burst) => {
            if (burst.time >= tPrev && burst.time <= tNow) {
                for (let i = 0; i < burst.count; i += 1) {
                    this.generateParticle();
                }
            }
        });
        this._updateCounter = tNow;

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
