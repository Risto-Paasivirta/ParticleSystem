import { position } from "../Types";
import { Module } from "../Module";
import { Particle } from "../Particle";

export class PointGenerator extends Module {
    interval = 0.1;
    position: position = { x: 0, y: 0 };

    private _timer = 0;

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
        particle.position.x = this.position.x;
        particle.position.y = this.position.y;

        this.parentSystem.addParticle(particle);
    }
}
