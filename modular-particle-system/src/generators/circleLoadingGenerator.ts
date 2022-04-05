import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";

/**
 * Generator module that creates particles along the exterior of a circular area.
 *
 * Each particle is generated next to each other, so that when particles are regularly generated they move around the circle.
 *
 * @module
 * @category    Generator
 */
export class CircleLoadingGenerator extends ParticleGenerator {
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
            moduleTypeId: CircleLoadingGenerator.moduleTypeId,
            interval: this.interval,
            center: this.center,
            nextParticleAngle: this.nextParticleAngle,
            angleStep: this.angleStep,
        };
    }

    static fromObject(
        particleEffect: ParticleEffect,
        object: ModuleObject,
        hideWarnings: boolean,
    ): CircleLoadingGenerator {
        const module = new CircleLoadingGenerator(particleEffect);
        loadSerializedProperty(
            object,
            CircleLoadingGenerator,
            module,
            "interval",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            CircleLoadingGenerator,
            module,
            "center",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            CircleLoadingGenerator,
            module,
            "nextParticleAngle",
            deserializePrimitiveDataType,
            hideWarnings,
        );
        loadSerializedProperty(
            object,
            CircleLoadingGenerator,
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
    static moduleTypeId = "CircleLoadingGenerator";
}
