import { ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { ParticleGenerator } from "./generator";
import {
    deserializeShape,
    getRandomPositionInsideShape,
    getRandomPositionOnEdge,
    serializeShape,
    Shape,
} from "../shapes/shape";

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
 *
 * @module
 * @category    Generator
 * interval {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @step           0.01
 *      @defaultValue   0.1
 * }
 * shape {
 *      @tooltip        TODO
 *      @type           Shape
 *      @defaultValue   { "type": "rectangle", "v1": {"x": -50, "y": -50}, "v2": {"x": 50, "y": 50} }
 * }
 * bursts {
 *      @tooltip        TODO
 *      @type           Burst[]
 *      @defaultValue   []
 * }
 * edgesOnly {
 *      @tooltip        TODO
 *      @type           Boolean
 *      @defaultValue   false
 * }
 */
export class ShapeGenerator extends ParticleGenerator {
    shape?: Shape;
    edgesOnly = false;

    generateParticle() {
        const particle = new Particle();
        if (this.shape) {
            if (this.edgesOnly) {
                particle.position = getRandomPositionOnEdge(this.shape);
            } else {
                particle.position = getRandomPositionInsideShape(this.shape);
            }
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
            bursts: this.bursts,
            shape: this.shape ? serializeShape(this.shape) : undefined,
            edgesOnly: this.edgesOnly,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject, hideWarnings: boolean): ShapeGenerator {
        const module = new ShapeGenerator(particleEffect);
        loadSerializedProperty(object, ShapeGenerator, module, "interval", deserializePrimitiveDataType, hideWarnings);
        loadSerializedProperty(object, ShapeGenerator, module, "bursts", deserializePrimitiveDataType, hideWarnings);
        loadSerializedProperty(object, ShapeGenerator, module, "shape", deserializeShape, hideWarnings);
        loadSerializedProperty(object, ShapeGenerator, module, "edgesOnly", deserializePrimitiveDataType, hideWarnings);
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "ShapeGenerator";
}
