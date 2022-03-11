import { ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { Position } from "../types";
import { ParticleGenerator } from "./generator";

export class PointGenerator extends ParticleGenerator {
    position: Position = { x: 0, y: 0 };

    generateParticle() {
        const particle = new Particle();
        particle.position.x = this.position.x;
        particle.position.y = this.position.y;

        this.particleEffect.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: PointGenerator.moduleTypeId,
            interval: this.interval,
            position: this.position,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): PointGenerator {
        const module = new PointGenerator(particleEffect);
        loadSerializedProperty(object, PointGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, PointGenerator, module, "position", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "PointGenerator";
}
