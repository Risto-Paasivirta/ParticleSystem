/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Particle } from "./Particle";
import { ParticleSystem } from "./ParticleSystem";

export abstract class Module {
    active = true;
    parentSystem: ParticleSystem;

    constructor(parentSystem: ParticleSystem) {
        this.parentSystem = parentSystem;
    }

    init(): void {}
    update(dt: number): void {}
    onAddParticle(particle: Particle): void {}
    onDestroyParticle(particle: Particle): void {}
}
