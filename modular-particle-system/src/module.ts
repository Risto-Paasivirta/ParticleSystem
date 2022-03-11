/* eslint-disable @typescript-eslint/no-empty-function */
import { ParticleEffect } from "./particleEffect";

export abstract class Module {
    active = true;
    particleEffect: ParticleEffect;

    constructor(particleEffect: ParticleEffect) {
        this.particleEffect = particleEffect;
    }

    init(): void {}
    update(dt: number): void {}
}
