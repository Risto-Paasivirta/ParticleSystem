import { Position } from "../types";
import { Module } from "../module";
import { Particle } from "../particle";
import { randomIntFromRange } from "../util";

export class CircleGenerator extends Module {
    interval = 0.1;
    position: Position = { x: 0, y: 0 };
    radians = Math.random() * Math.PI * 2;
    velocity = 0.05;
    distanceFromCenter = randomIntFromRange(50, 120);

    private _timer = 0;

    update(dt: number): void {
        //avoid infinite loop
        if (this.interval <= 0) {
            return;
        }

        this.radians += this.velocity;
        this._timer += dt;

        while (this._timer >= this.interval) {
            this._timer -= this.interval;
            this.createParticle(this.radians);
        }
    }

    createParticle(radians: number) {
        const particle = new Particle();
        particle.position.x = this.position.x + Math.cos(radians) * this.distanceFromCenter;
        particle.position.y = this.position.y + Math.sin(radians) * this.distanceFromCenter;

        this.parentSystem.addParticle(particle);
    }
}
