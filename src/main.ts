import { initKeys } from './primitive/keys';
import { initFixedContext } from './primitive/graphics';
import { type Scene, SceneState, runGame } from './primitive/scene';
import './style.css';
import { Rectangle } from './render/rectangle';

export const [width, height] = [800, 800];
export const [keys, getKey] = initKeys();
const ctx = initFixedContext(width, height);

const rectangle = new Rectangle([60, 60], [100, 100], 'red');

const SCENES: Scene[] = [dt => {
    ctx.clearRect(0, 0, width, height);

    rectangle.draw(ctx);
    rectangle.rotation += dt;

    return [SceneState.CONTINUE];
}];

runGame(SCENES);
