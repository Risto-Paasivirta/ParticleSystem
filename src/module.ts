/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ParticleSystem } from "./particleSystem";

export abstract class Module {
    active = true;
    parentSystem: ParticleSystem;

    constructor(parentSystem: ParticleSystem) {
        this.parentSystem = parentSystem;
    }

    init(): void {}
    update(dt: number): void {}
}
