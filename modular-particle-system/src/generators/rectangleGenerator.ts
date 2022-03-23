import { ModuleObject } from "../module";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { deserializePrimitiveDataType, loadSerializedProperty } from "../serialization/moduleSerialization";
import { Position } from "../types";
import { ParticleGenerator } from "./generator";

export class RectangleGenerator extends ParticleGenerator {
    /**
     * Start position of the rectangle
     */
    startPosition: Position = { x: 0, y: 0 };
    /**
     * Width of the rectangle
     */
    width = 200;
    /**
     * Height of the rectangle
     */
    height = 50;

    generateParticle(): void {
        const particle = new Particle();
        const width = Math.round(Math.random() * this.width);
        const height = Math.round(Math.random() * this.height);
        particle.position.x = this.startPosition.x + width;
        particle.position.y = this.startPosition.y + height;
        this.particleEffect.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: RectangleGenerator.moduleTypeId,
            interval: this.interval,
            width: this.width,
            height: this.height,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): RectangleGenerator {
        const module = new RectangleGenerator(particleEffect);
        loadSerializedProperty(object, RectangleGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, RectangleGenerator, module, "width", deserializePrimitiveDataType);
        loadSerializedProperty(object, RectangleGenerator, module, "height", deserializePrimitiveDataType);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "RectangleGenerator";
}
