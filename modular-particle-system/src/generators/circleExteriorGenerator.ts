// NOTE: Ideally we would have a class for `CircleGenerator`, where user could configure whether to generate particles inside the circle or along the exterior.
// `generator.onlyExterior = true` or something like this.

import { ModuleObject } from "../module";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";
import { Particle } from "../particle";
import { ParticleEffect } from "../particleEffect";
import { Position } from "../types";
import { ParticleGenerator } from "./generator";

/**
 * Generator module that creates particles along the exterior of a circular area.
 *
 * Each particle is generated next to each other, so that when particles are regularly generated they move around the circle.
 *
 * @module
 * interval {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @step           0.01
 *      @defaultValue   0.1
 * }
 * center {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * radius {
 *      @tooltip        TODO
 *      @type           Number
 *      @defaultValue   50
 *      @min            0
 *      @step           10
 * }
 * nextParticleAngle {
 *      @tooltip        TODO
 *      @type           Number
 *      @defaultValue   0
 *      @step           0.1
 * }
 * angleStep {
 *      @tooltip        TODO
 *      @type           Number
 *      @defaultValue   0.5
 *      @step           0.1
 * }
 * bursts {
 *      @tooltip        TODO
 *      @type           Burst[]
 * }
 */
export class CircleExteriorGenerator extends ParticleGenerator {
    /**
     * Center location of the circle.
     */
    center: Position = { x: 0, y: 0 };
    /**
     * Radius of the circle as pixels.
     */
    radius = 50;
    /**
     * The angle at which the next particle will be generated at.
     *
     * Unit is in _radians_.
     */
    nextParticleAngle = 0;
    /**
     * The angle that is incremented between each generated particle.
     *
     * Unit is in _radians_.
     */
    angleStep = 0.5;

    generateParticle(): void {
        const particle = new Particle();
        particle.position.x = this.center.x + Math.cos(this.nextParticleAngle) * this.radius;
        particle.position.y = this.center.y + Math.sin(this.nextParticleAngle) * this.radius;
        this.nextParticleAngle += this.angleStep;

        this.particleEffect.addParticle(particle);
    }

    /**
     * Wrap the properties of the module into a JSON containing only primitive JavaScript data types
     * (such as numbers, strings, etc.) that can be serialized into strings natively.
     */
    toObject(): ModuleObject {
        return {
            moduleTypeId: CircleExteriorGenerator.moduleTypeId,
            center: this.center,
            radius: this.radius,
            nextParticleAngle: this.nextParticleAngle,
            angleStep: this.angleStep,
        };
    }

    static fromObject(
        particleEffect: ParticleEffect,
        object: ModuleObject,
        hideWarnings: boolean,
    ): CircleExteriorGenerator {
        const module = new CircleExteriorGenerator(particleEffect);
        loadSerializedProperty(
            object,
            CircleExteriorGenerator,
            module,
            "center",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            CircleExteriorGenerator,
            module,
            "radius",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            CircleExteriorGenerator,
            module,
            "nextParticleAngle",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            CircleExteriorGenerator,
            module,
            "angleStep",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        return module;
    }

    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "CircleExteriorGenerator";
}
