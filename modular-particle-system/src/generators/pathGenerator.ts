import { Position } from "../types";
import { Particle } from "../particle";
import { ParticleGenerator } from "./generator";
import { lerp } from "../utilities";
import { ModuleObject } from "../module";
import { ParticleEffect } from "../particleEffect";
import { loadSerializedProperty, deserializePrimitiveDataType } from "../serialization/moduleSerialization";

/**
 * Generator module that creates in a path.
 *
 * @module
 * interval {
 *      @tooltip        TODO
 *      @type           Number
 *      @min            0
 *      @step           0.01
 *      @defaultValue   0.1
 * }
 * p1 {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * p2 {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * p3 {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * p4 {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * p5 {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * p6 {
 *      @tooltip        TODO
 *      @type           Position
 * }
 * padding {
 *      @tooltip        TODO
 *      @type           Number
 * }
 * between {
 *      @tooltip        TODO
 *      @type           Boolean
 * }
 */

export class PathGenerator extends ParticleGenerator {
    p1: Position = { x: 0, y: 0 };
    p2: Position = { x: 0, y: 0 };
    p3?: Position;
    p4?: Position;
    p5?: Position;
    p6?: Position;
    padding?: number;
    between?: boolean;

    generatePosition(
        p1: Position,
        p2: Position,
        p3?: Position,
        p4?: Position,
        p5?: Position,
        p6?: Position,
        padding?: number,
        between?: boolean,
    ): Position {
        // NOTE: This implementation does not achieve uniform random distribution!

        const newPosition: Position = { x: 0, y: 0 };
        if (padding) {
            let yPadding;
            let xPadding;
            if (between) {
                yPadding = this.generatePadding(padding, between);
                xPadding = this.generatePadding(padding, between);
            } else {
                yPadding = this.generatePadding(padding, false);
                xPadding = this.generatePadding(padding, false);
            }
            newPosition.x = newPosition.x + xPadding;
            newPosition.y = newPosition.y + yPadding;
        }
        if (typeof p3 == "undefined") {
            newPosition.x += lerp(p1.x, p2.x, Math.random());
            newPosition.y += lerp(p1.y, p2.y, Math.random());
        } else if (typeof p4 == "undefined") {
            const secondLine = Math.random() < 0.5;
            if (secondLine == false) {
                newPosition.x += lerp(p1.x, p2.x, Math.random());
                newPosition.y += lerp(p1.y, p2.y, Math.random());
            } else {
                newPosition.x += lerp(p2.x, p3.x, Math.random());
                newPosition.y += lerp(p2.y, p3.y, Math.random());
            }
        } else if (typeof p5 == "undefined") {
            const Line = Math.random();
            if (Line <= 0.33) {
                newPosition.x += lerp(p1.x, p2.x, Math.random());
                newPosition.y += lerp(p1.y, p2.y, Math.random());
            } else if (Line > 0.33 && Line <= 0.66) {
                newPosition.x += lerp(p2.x, p3.x, Math.random());
                newPosition.y += lerp(p2.y, p3.y, Math.random());
            } else {
                newPosition.x += lerp(p3.x, p4.x, Math.random());
                newPosition.y += lerp(p3.y, p4.y, Math.random());
            }
        } else if (typeof p6 == "undefined") {
            const Line = Math.random();
            if (Line <= 0.25) {
                newPosition.x += lerp(p1.x, p2.x, Math.random());
                newPosition.y += lerp(p1.y, p2.y, Math.random());
            } else if (Line > 0.25 && Line <= 0.5) {
                newPosition.x += lerp(p2.x, p3.x, Math.random());
                newPosition.y += lerp(p2.y, p3.y, Math.random());
            } else if (Line > 0.5 && Line <= 0.75) {
                newPosition.x += lerp(p3.x, p4.x, Math.random());
                newPosition.y += lerp(p3.y, p4.y, Math.random());
            } else {
                newPosition.x += lerp(p4.x, p5.x, Math.random());
                newPosition.y += lerp(p4.y, p5.y, Math.random());
            }
        } else if (p6) {
            const Line = Math.random();
            if (Line <= 0.2) {
                newPosition.x += lerp(p1.x, p2.x, Math.random());
                newPosition.y += lerp(p1.y, p2.y, Math.random());
            } else if (Line > 0.2 && Line <= 0.4) {
                newPosition.x += lerp(p2.x, p3.x, Math.random());
                newPosition.y += lerp(p2.y, p3.y, Math.random());
            } else if (Line > 0.4 && Line <= 0.6) {
                newPosition.x += lerp(p3.x, p4.x, Math.random());
                newPosition.y += lerp(p3.y, p4.y, Math.random());
            } else if (Line > 0.6 && Line <= 0.8) {
                newPosition.x += lerp(p4.x, p5.x, Math.random());
                newPosition.y += lerp(p4.y, p5.y, Math.random());
            } else {
                newPosition.x += lerp(p5.x, p6.x, Math.random());
                newPosition.y += lerp(p5.y, p6.y, Math.random());
            }
        }
        return newPosition;
    }

    generatePadding(padding: number, between: boolean) {
        let newPadding = padding;
        if (between) {
            newPadding = lerp(0, padding, Math.random());
        }
        newPadding *= Math.round(Math.random()) ? 1 : -1;
        return newPadding;
    }

    generateParticle() {
        const particle = new Particle();
        const position = this.generatePosition(
            this.p1,
            this.p2,
            this.p3,
            this.p4,
            this.p5,
            this.p6,
            this.padding,
            this.between,
        );
        particle.position.x = position.x;
        particle.position.y = position.y;
        this.particleEffect.addParticle(particle);
    }
    toObject(): ModuleObject {
        return {
            moduleTypeId: PathGenerator.moduleTypeId,
            interval: this.interval,
            p1: this.p1,
            p2: this.p2,
            p3: this.p3,
            p4: this.p4,
            p5: this.p5,
            p6: this.p6,
            padding: this.padding,
            between: this.between,
        };
    }

    static fromObject(particleEffect: ParticleEffect, object: ModuleObject): PathGenerator {
        const module = new PathGenerator(particleEffect);
        loadSerializedProperty(object, PathGenerator, module, "interval", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "p1", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "p2", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "p3", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "p4", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "p5", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "p6", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "padding", deserializePrimitiveDataType);
        loadSerializedProperty(object, PathGenerator, module, "between", deserializePrimitiveDataType);
        return module;
    }
    /**
     * Serializable identifier for the module.
     *
     * This must be unique between all existing Modules in the library.
     */
    static moduleTypeId = "PathGenerator";
}
