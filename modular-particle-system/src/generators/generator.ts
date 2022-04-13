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
     *
     * Optional `repeat` property can be supplied to supply a second interval which the batch is automatically repeated with afterwards.
     */
    bursts: Array<{ time: number; count: number; repeat?: number }> = [];
    private _updateCounter = 0;

    update(dt: number): void {
        const tPrev = this._updateCounter;
        const tNow = this._updateCounter + dt;
        // Trigger all bursts that are between tPrev and tNow
        this.bursts.forEach((burst) => {
            const burstTimestamp =
                burst.repeat === undefined || burst.repeat <= 0 || burst.time > tPrev
                    ? burst.time
                    : burst.time + burst.repeat * Math.ceil((tPrev - burst.time) / burst.repeat);

            if (burstTimestamp >= tPrev && burstTimestamp <= tNow) {
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
