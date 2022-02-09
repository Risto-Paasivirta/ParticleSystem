import { Position } from "Types";

export class Triangle {
    v1: Position = { x: 0, y: 0 };
    v2: Position = { x: 0, y: 0 };
    v3: Position = { x: 0, y: 0 };

    getRandomPoint(): Position {
        const r1 = Math.random();
        const r2 = Math.random();

        const s1 = Math.sqrt(r1);

        return {
            x: this.v1.x * (1.0 - s1) + this.v2.x * (1.0 - r2) * s1 + this.v3.x * r2 * s1,
            y: this.v1.y * (1.0 - s1) + this.v2.y * (1.0 - r2) * s1 + this.v3.y * r2 * s1,
        };

        //alternative version that might be faster, something to benchmark for you
        /*
        const s = Math.abs(r1 - r2);
        const t = 0.5 * (r1 + r2 - s);
        const u = 1 - 0.5 * (s + r1 + r2);

        return {
            x: s * this.v1.x + t * this.v2.x + u * this.v3.x,
            y: s * this.v1.y + t * this.v2.y + u * this.v3.y,
        };
        */
    }

    /*
    how to get unbiased random point along the edge?

    you must calculate the length of each side and normalize them so each side is a proportion from one
    lets say side1 is 0.3, side2 is 0.2 and side3 is 0.5 after normalization
    then you take a random value between zero and one to see where in edge the randomized point lies
    using inverse linear interpolation (if the random value is between 0.0 and 0.3 it lies somewhere along the side1)
    */
}
