import { ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { ParticleGenerator } from "./generator";
import { deserializeShape, getRandomPositionInsideShape, serializeShape, Shape } from "../shapes/shape";

/**
 * Module that can be used to generate particles with an initial position inside a generic _Shape_.
 *
 * Shape is assigned via `ShapeGenerator.shape` property, for example:
 *
 * ```ts
 *  const generator = new ShapeGenerator(particleEffect)
 *  generator.shape = {
 *      type: 'rectangle',
 *      v1: { x: 100, y: 100 },
 *      v2: { x: 300, y: 500 }
 *  }
 * ```
 */
export class ShapeGenerator extends ParticleGenerator {
    shape?: Shape;

    generateParticle() {
        const particle = new Particle();
        if (this.shape) {
            particle.position = getRandomPositionInsideShape(this.shape);
        }
        this.particleEffect.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: ShapeGenerator.moduleTypeId,
            interval: this.interval,
            shape: this.shape ? serializeShape(this.shape) : undefined,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): ShapeGenerator {
        const module = new ShapeGenerator(particleEffect);
        loadSerializedProperty(object, ShapeGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, ShapeGenerator, module, "shape", deserializeShape);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "ShapeGenerator";
}
