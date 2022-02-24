/* eslint-disable @typescript-eslint/no-empty-function */
import { ModuleObject, ParticleSystem } from "./particleSystem";

export abstract class Module {
    active = true;
    parentSystem: ParticleSystem;

    constructor(parentSystem: ParticleSystem) {
        this.parentSystem = parentSystem;
    }

    init(): void {}
    update(dt: number): void {}

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    abstract toObject(): ModuleObject;
}
