// src/primitives/scene.ts

/**
 * @example
 * const callback = (dt: number) => {
 *     ...
 *     return [SceneState.CONTINUE];
 * };
 */
export enum SceneState {
    CONTINUE,
    STOP,
};

/**
 * @example
 * const SCENES: Scene[] = [(dt: number) => {
 *     ...
 *     if (keyDown('q')) return [SceneState.STOP, 1];
 *     return [SceneState.CONTINUE];
 * }, (dt: number) => {
 *     console.log(dt);
 *     return [SceneState.STOP, 0];
 * }];
 */
export type Scene = (dt: number) => [SceneState, number?];

/**
 * @example
 * const SCENES: Scene[] = [(dt: number) => {
 *     ...
 *     if (keyDown('q')) return [SceneState.STOP, 1];
 *     return [SceneState.CONTINUE];
 * }, (dt: number) => {
 *     console.log(dt);
 *     return [SceneState.STOP, 0];
 * }];
 *
 * let id = 0;
 * (async () => {
 *     while (true) {
 *         id = await renderScene(SCENES[id]);
 *     }
 * })();
 */
export const renderScene = async (
    callback: Scene
): Promise<number> => {
    let loop: number;

    return new Promise(resolve => { 
        const transformedCallback = (before: number) => (now: number) => {
            const dt = Math.min(0.5, (now - before) / 1_000);
            const [state, next] = callback(dt);

            switch (state) {
                case SceneState.CONTINUE:
                    loop = requestAnimationFrame(transformedCallback(now));
                    break;
                case SceneState.STOP:
                    cancelAnimationFrame(loop);
                    resolve(next as number);
                    break;
            }
        };

        requestAnimationFrame(transformedCallback(performance.now()));
    });
};

/**
 * @example
 * const SCENES: Scene[] = [(dt: number) => {
 *     ...
 *     if (keyDown('q')) return [SceneState.STOP, 1];
 *     return [SceneState.CONTINUE];
 * }, (dt: number) => {
 *     console.log(dt);
 *     return [SceneState.STOP, 0];
 * }];
 *
 * runGame(SCENES);
 */
export const runGame = async (SCENES: Scene[], startIdx = 0) => {
    let id = startIdx;
    while (true) {
        id = await renderScene(SCENES[id]);
    }
};
