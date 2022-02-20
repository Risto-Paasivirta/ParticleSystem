// Easing functions for animations
// See https://easings.net/#

/**
 * Type definition of an _Easing function_.
 *
 * @param   x   Number between [0, 1] where 0 is start of animation and 1 is end of animation.
 * @returns     Number between [0, 1] where 0 is start of animation and 1 is end of animation.
 */
export type EasingFunction = (x: number) => number;

/**
 * Collection of all implemented _Easing functions_.
 */
export const EasingFunctions = {
    /**
     *
     */
    linear: ((x: number) => {
        return x;
    }) as EasingFunction,
    /**
     * https://easings.net/#easeOutSine
     */
    easeOutSine: ((x: number) => {
        return Math.sin((x * Math.PI) / 2);
    }) as EasingFunction,
    /**
     * https://easings.net/#easeOutCubic
     */
    easeOutCubic: ((x: number) => {
        return 1 - Math.pow(1 - x, 3);
    }) as EasingFunction,
    /**
     * https://easings.net/#easeOutExpo
     */
    easeOutExpo: ((x: number) => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }) as EasingFunction,
    /**
     * https://easings.net/#easeOutCirc
     */
    easeOutCirc: ((x: number) => {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }) as EasingFunction,
    /**
     * https://easings.net/#easeOutBack
     */
    easeOutBack: ((x: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }) as EasingFunction,
    /**
     * https://easings.net/#easeOutElastic
     */
    easeOutElastic: ((x: number) => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }) as EasingFunction,
};
